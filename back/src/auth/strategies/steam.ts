import {Strategy} from 'passport-steam';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {envData} from '@/constants';
import {AuthService} from "@/auth.service";
import {SteamProfile} from "@/interfaces/user";


@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      returnURL: envData.serverHost + '/v1/auth/steam',
      realm: envData.serverHost,
      apiKey: envData.steamApiKey,
    });
  }

  async validate(userLink: string, profile: SteamProfile, done): Promise<void> {
    const identifierRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;
    const steamId = identifierRegex.exec(userLink)[1];
    const {user} = await this.authService.steamValidate(steamId, profile);
    done(null, user);
  }

}