import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {Roles} from "@/decorators/roles";
import {UserGroup} from "@/typeorm/entities/user";
import {SkinsService} from "@/admin/skins.service";

@Controller({
  path: 'admin/skins',
  version: '1',
})
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {
  }

  @Get()
  @Roles(UserGroup.ADMIN)
  async getSkinList() {
    return await this.skinsService.getSkinList();
  }

  @Get('default')
  @Roles(UserGroup.ADMIN)
  async getDefaultSkins() {
    return await this.skinsService.getDefaultSkins();
  }

  @Post()
  @Roles(UserGroup.ADMIN)
  async addSkin(@Body() body: {
    newSkin: {
      skinId: number,
      permission: string,
      itemId: number,
      collectionId?: number
    },
    collectionThumbnail?: string,
    collectionTitle: string,
  }) {
    return await this.skinsService.addSkin(
      {
        ...body.newSkin,
        collectionId: body.newSkin.collectionId ?? 0
      },
      body.collectionThumbnail ?? '/media/none.png',
      body.collectionTitle ?? 'ERROR',
    );
  }

  @Delete()
  @Roles(UserGroup.ADMIN)
  async delSkin(@Body() body: { skinId: string }) {
    return await this.skinsService.delSkin(Number(body.skinId));
  }
}
