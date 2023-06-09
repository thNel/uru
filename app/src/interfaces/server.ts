import {ItemWinGroup} from "@/constants/enums";
import {Dict} from "@/interfaces/index";

export interface Skin<T=null> extends Dict<string|number|T> {
  id: number;
  skinId: number;
  previewUrl: string;
  skinTitle: string;
}

export interface SkinDefault extends Skin {
  itemShortname: string;
}

interface SkinWithPermission<T=null> extends Skin<T> {
  requiredPermission: string;
}

export interface SkinPermissions {
  ID: string;
  Perms: string;
  Players: string;
  Player: boolean;
}

export interface SkinsCollection {
  id: number;
  permissions?: SkinPermissions[];

  skins?: SkinWithPermission[];

  thumbnailUrl: string;

  title: string;
}

export interface SkinInfo extends SkinWithPermission<Item | SkinsCollection | null> {
  item: Item;

  collection: SkinsCollection | null;
}

export interface Item<T=null> extends Dict<string|number|boolean|null|T>{
  id: number;
  shortname: string;
  title: string;
  skinsAvailable: boolean;
  winGroup: ItemWinGroup | null;
  winCount: number;
}

export interface ItemInfo extends Item<SkinWithPermission[]> {
  skins: SkinWithPermission[];
}

export interface ServerMessage {
  delay?: number,
  success?: boolean,
  error?: boolean,
  message: string,
}