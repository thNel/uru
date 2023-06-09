import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Item} from "@/typeorm/entities/items";
import {RouletteService} from "@/roulette.service";
import {RouletteController} from "@/roulette.controller";
import {OrderedItem, User} from "@/typeorm/entities/user";

@Module({
  imports: [TypeOrmModule.forFeature([Item, User, OrderedItem])],
  providers: [RouletteService],
  controllers: [RouletteController],
})
export class RouletteModule {
}