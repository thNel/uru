import {Body, Controller, Get, Post, Put,} from '@nestjs/common';
import {ItemsService} from "@/admin/items.service";
import {Roles} from "@/decorators/roles";
import {UserGroup} from "@/typeorm/entities/user";
import {ItemEdit} from "@/interfaces/admin";
import {externalItems} from "@/constants/extItems";

@Controller({
  path: 'admin/items',
  version: '1',
})
export class ItemsController {
  constructor(private readonly adminService: ItemsService) {
  }

  @Post()
  @Roles(UserGroup.ADMIN)
  async addItem(@Body() body: {shortname: string}) {
    return await this.adminService.addItem(body.shortname);
  }

  @Get()
  @Roles(UserGroup.ADMIN)
  async getItemList() {
    return await this.adminService.getItemList();
  }

  @Get('excluded')
  @Roles(UserGroup.ADMIN)
  async getExcludedItems() {
    const items = await this.adminService.getItemList();
    return externalItems.filter(it => items.findIndex(item => item.shortname === it.shortname) === -1);
  }

  @Put()
  @Roles(UserGroup.ADMIN)
  async editItems(@Body() body: { items: ItemEdit[] }) {
    return await this.adminService.editItems(body.items);
  }
}
