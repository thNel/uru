import {ServerMessage} from "@/interfaces/server";

export interface ItemShortObject {
  title: string,
  shortname: string,
}

export interface Dict<T=string> {
  [key: string | number]: T;
}

export interface IToast extends ServerMessage {
  id: number,
  sender?: string,
  time: Date
}