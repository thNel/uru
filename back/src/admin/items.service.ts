import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Item} from "@/typeorm/entities/items";
import {DefaultSkin, Skin} from "@/typeorm/entities/skins";
import {ItemEdit} from "@/interfaces/admin";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Skin)
    private skinRepository: Repository<Skin>,
    @InjectRepository(DefaultSkin)
    private defaultSkinRepository: Repository<DefaultSkin>,
  ) {
  }

  async addItem(shortname: string) {
    const founded = await this.itemRepository.findOneBy({shortname});
    if (founded !== null)
      return founded
    return await this.itemRepository.save({shortname: shortname});
  }

  async getItemList() {
    return await this.itemRepository.find({relations: {skins: true}});
  }

  async editItems(items: ItemEdit[]) {
    return await this.itemRepository.save(items);
  }
}
