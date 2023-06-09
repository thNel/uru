import {atom} from "recoil";
import {SkinDefault, SkinInfo} from "@/interfaces/server";

export const skinsState = atom({
  key: 'skinsState',
  default: [] as SkinInfo[],
});

export const skinsDefaultState = atom({
  key: 'skinsDefaultState',
  default: [] as SkinDefault[],
})