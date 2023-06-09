import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from './user.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UserPassPair, SteamProfile} from '@/interfaces/user';
import {User} from '@/typeorm/entities/user';
import {keyHidden} from '@/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      return {...user, password: keyHidden};
    }
    throw new HttpException({message: 'Неверный логин или пароль'}, HttpStatus.UNAUTHORIZED);
  }

  async steamValidate(steamId: string, profile: SteamProfile): Promise<{ user: User }> {
    if (!steamId || !profile)
      throw new HttpException({message: 'Неудачная авторизация steam!'}, HttpStatus.UNAUTHORIZED);
    const user = await this.usersService.findOneByOpenID({steamId: steamId, profile});
    return {user: {...user, password: keyHidden}};
  }

  async login(user: User) {
    const payload = {username: user.username, sub: user.id};
    const token = await this.jwtService.signAsync(payload);
    return {
      success: "logged-in",
      error: null,
      message: "Вход выполнен",
      access_token: token,
      user,
    };
  }

  async register({username, password}: UserPassPair) {
    try {
      await this.usersService.register(username, password);
      return {success: true, message: 'Вы успешно зарегистрированы'}
    } catch (e) {
      throw new HttpException({message: String(e?.message ?? e)}, HttpStatus.BAD_REQUEST);
    }
  }

}