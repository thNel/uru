import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envData} from '@/constants';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from '@/auth/guards/jwt';
import {AuthModule} from './auth.module';
import {OrderedItem, User} from "@/typeorm/entities/user";
import {Item} from "@/typeorm/entities/items";
import {DefaultSkin, Skin} from "@/typeorm/entities/skins";
import {SkinPermissions} from "@/typeorm/entities/permissions";
import {AdminModule} from "@/admin/admin.module";
import {RouletteModule} from "@/roulette.module";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";
@Module({
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envData.dbHost,
      port: Number(envData.dbPort),
      username: envData.dbUser,
      password: envData.dbPass,
      database: envData.dbName,
      entities: [
        User,
        Item,
        Skin,
        DefaultSkin,
        SkinPermissions,
        SkinsCollection,
        OrderedItem,
      ],
      synchronize: false,
    }),
    AuthModule,
    AdminModule,
    RouletteModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
