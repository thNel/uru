import {atom} from "recoil";
import {IToast} from "@/interfaces";

export const toastState = atom({
  key: 'toastState',
  default: [] as IToast[],
});