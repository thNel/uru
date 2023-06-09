import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Item} from "@/typeorm/entities/items";
import {DefaultSkin, Skin} from "@/typeorm/entities/skins";
import {HttpModule} from "@nestjs/axios";
import {SkinsService} from "@/admin/skins.service";
import {SkinsController} from "@/admin/skins.controller";
import {SkinPermissions} from "@/typeorm/entities/permissions";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";

@Module({
  imports: [TypeOrmModule.forFeature([Item, Skin, DefaultSkin, SkinsCollection, SkinPermissions]), HttpModule],
  providers: [SkinsService],
  controllers: [SkinsController],
})
export class SkinsModule {
}