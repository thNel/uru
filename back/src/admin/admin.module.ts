import { Module } from '@nestjs/common';
import {ItemsModule} from "@/admin/items.module";
import {SkinsModule} from "@/admin/skins.module";

@Module({
  imports: [SkinsModule, ItemsModule],
})
export class AdminModule {}