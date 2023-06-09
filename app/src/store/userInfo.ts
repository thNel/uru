import {atom} from "recoil";
import {UserGroup} from "@/constants/enums";
export interface User {
  id: string;
  username: string;
  userGroup: UserGroup;
  steamId: string;
  email: string;
  telegram: string;
  vk: string;
  lastSeen: Date;
  lastPrize: number;
  rollCount: number;
  lastRoll: string | null;
  created: Date;
  updated: Date;
}

export const userInfoState = atom<User|undefined>({
  key: 'userInfoState',
  default: undefined,
});