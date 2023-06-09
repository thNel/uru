import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {User} from '@/typeorm/entities/user';
import {AuthService} from "@/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    return await this.authService.validateUser(username, password);
  }
}