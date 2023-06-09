import {Module} from '@nestjs/common';
import {LocalStrategy} from '@/auth/strategies/local';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {envData} from '@/constants';
import {JwtStrategy} from '@/auth/strategies/jwt';
import {AuthService} from "@/auth.service";
import {UsersModule} from "@/user.module";
import {AuthController} from "@/auth.controller";
import {SteamStrategy} from "@/auth/strategies/steam";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: envData.jwt.secret,
      signOptions: {expiresIn: envData.jwt.expires},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SteamStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}