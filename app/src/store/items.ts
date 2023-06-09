import {atom} from "recoil";
import {Item, ItemInfo} from "@/interfaces/server";
import {Dict} from "@/interfaces";

export const itemsState = atom<ItemInfo[]>({
  key: 'itemsState',
  default: [],
});

export const rouletteItems = atom<null | Dict<Item[]>>({
  key: 'rouletteItems',
  default: null,
})