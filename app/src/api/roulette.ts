import {Item} from "@/interfaces/server";
import axios from "axios";
import {apiUrls} from "@/constants/api";
import {User} from "@/store/userInfo";

export const getRouletteItemList = async (): Promise<Item[] | undefined> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.itemsOperation)).data;
  } catch (e: any) {
    throw {error: true, message: String(e?.response?.data?.message ?? e), delay: 5000}
  }
}

export const getWin = async (): Promise<{ item: Item, sector: number, user: User } | undefined> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.itemsOperation + apiUrls.rouletteDo)).data;
  } catch (e:any) {
    throw {error: true, message: String(e?.response?.data?.message ?? e), delay: 5000}
  }
}