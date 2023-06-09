import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@/typeorm/entities/user';
import {SteamProfile} from "@/interfaces/user";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({username});
  }

  async findOneByOpenID({steamId, profile}: { steamId: string, profile: SteamProfile }): Promise<User> {
    const user = await this.usersRepository.findOneBy({steamId});
    if (!user) {
      return await this.usersRepository.save({username: profile.displayName, steamId, password: steamId})
    } else {
      if (user.username !== profile.displayName) {
        user.username = profile.displayName
        await this.usersRepository.save(user)
      }
      return user;
    }
  }

  async register(username: string, password: string): Promise<void> {
    if (await this.findOne(username)) {
      throw new Error('Такой пользователь уже существует!');
    }
    const crypted = await bcrypt.hash(password, 10);
    await this.usersRepository.save({
      username,
      password: crypted,
    });
  }

  async seen(user: User): Promise<User> {
    return await this.usersRepository.save({...user, lastSeen: (new Date(Date.now())),});
  }
}