import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IsNull, Not, Repository} from "typeorm";
import {Item} from "@/typeorm/entities/items";
import {OrderedItem, orderedItemType, User} from "@/typeorm/entities/user";
import {numberRustRouletteList} from "@/constants";
import * as crypto from "crypto";

@Injectable()
export class RouletteService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OrderedItem)
    private orderedItemRepository: Repository<OrderedItem>,
  ) {
  }
  async getItemList() {
    return await this.itemRepository.find({where: {winGroup: Not(IsNull())}});
  }

  async roll(user: User): Promise<{item: Item, sector: number, user: User}> {
    if (user.rollCount < 1)
      if (((new Date()).getTime() - user.lastRoll?.getTime()) > 1000*60*60*12)
        user.rollCount++;
    if (user.rollCount < 1)
      throw new HttpException('Произошла ошибка. У вас недостаточно прокруток рулетки!', HttpStatus.CONFLICT);
    const items = await this.getItemList();
    let array = new Uint32Array(1);
    crypto.webcrypto.getRandomValues(array);
    const prizeNumber = array[0] % 25;
    const tier = numberRustRouletteList[prizeNumber];
    const winItems = items.filter(item => item.winGroup === tier);
    array = new Uint32Array(1);
    crypto.webcrypto.getRandomValues(array);
    user.rollCount--;
    const updUser = await this.userRepository.save({...user, lastRoll: (new Date(Date.now())), lastPrize: prizeNumber});
    const item = winItems[(array[0] % winItems.length)];
    await this.orderedItemRepository.insert({user: updUser, item, type: orderedItemType.ITEM, skinCollection: null});
    return {item, sector: prizeNumber, user: updUser};
  }
}
