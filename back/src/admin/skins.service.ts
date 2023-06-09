import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {Item} from "@/typeorm/entities/items";
import {DefaultSkin, Skin} from "@/typeorm/entities/skins";
import {SteamSkin} from "@/interfaces/admin";
import {HttpService} from "@nestjs/axios";
import {steamSkinAPI} from "@/constants";
import {firstValueFrom, catchError} from "rxjs";
import {SkinPermissions} from "@/typeorm/entities/permissions";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";

@Injectable()
export class SkinsService {
  private readonly logger = new Logger(SkinsService.name);

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Skin)
    private skinRepository: Repository<Skin>,
    @InjectRepository(SkinsCollection)
    private skinCollectionRepository: Repository<SkinsCollection>,
    @InjectRepository(SkinPermissions)
    private skinsPermissions: Repository<SkinPermissions>,
    @InjectRepository(DefaultSkin)
    private defaultSkinRepository: Repository<DefaultSkin>,
    private readonly httpService: HttpService,
  ) {
  }

  async getSkinList() {
    return await this.skinRepository.find({relations: {item: true, collection: true}});
  }

  async addCollection(newCollection: { skins: Skin[], permissions: SkinPermissions[], thumbnailUrl: string, title: string }) {
    return  await this.skinCollectionRepository.save(newCollection);
  }

  async addSkin(
    newSkin: {
      itemId: number,
      collectionId?: number,
      skinId: number,
      permission: string,
      skinTitle?: string,
      previewUrl?: string,
    },
    thumbnailUrl: string,
    collectionTitle: string,
  ) {
    const item = await this.itemRepository.findOneBy({id: newSkin.itemId});
    const samePermissionSkins = await this.skinRepository.findBy({requiredPermission: newSkin.permission});
    const permissions = await this.skinsPermissions.findBy({Perms: Like(`%${newSkin.permission}%`)});
    let collection = await this.skinCollectionRepository.findOneBy({id: newSkin.collectionId});
    if (!collection)
      collection = await this.addCollection({skins: samePermissionSkins, thumbnailUrl, permissions, title: collectionTitle});
    let skinData = {publishedfiledetails: [{title: newSkin.skinTitle, preview_url: newSkin.previewUrl}]}
    if (!newSkin.skinTitle || !newSkin.previewUrl)
      skinData = (await firstValueFrom(this.httpService.post<{ response: SteamSkin }>(steamSkinAPI, {
        "itemcount": 1,
        "publishedfileids[0]": newSkin.skinId,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        })))).data.response;

    return await this.skinRepository.save({
      item,
      collection,
      skinId: newSkin.skinId,
      skinTitle: skinData.publishedfiledetails[0].title,
      previewUrl: skinData.publishedfiledetails[0].preview_url,
      requiredPermission: newSkin.permission,
    })
  }

  async delSkin(id: number) {
    return await this.skinRepository.delete({skinId: id});
  }

  async getDefaultSkins() {
    return await this.defaultSkinRepository.find();
  }
}
