import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Item} from "@/typeorm/entities/items";
import {DefaultSkin, Skin} from "@/typeorm/entities/skins";
import {ItemsService} from "@/admin/items.service";
import {ItemsController} from "@/admin/items.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([Item, Skin, DefaultSkin]), HttpModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {
}