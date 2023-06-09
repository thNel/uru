import {ExtractJwt, Strategy} from 'passport-jwt';
import {Request} from 'express';
import {PassportStrategy} from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {envData} from '@/constants';
import {JwtPayload} from '@/interfaces/user';
import {keyHidden} from '@/constants';
import {UserService} from "@/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.signedCookies?.access_token;
      }]),
      ignoreExpiration: false,
      secretOrKey: envData.jwt.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.username);
    if (user === null)
      return new HttpException('User error.', HttpStatus.UNAUTHORIZED)
    return {...(await this.usersService.seen(user)), password: keyHidden};
  }
}