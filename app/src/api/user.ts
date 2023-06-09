import axios from "axios";
import {apiUrls} from "@/constants/api";
// @ts-ignore
import {hash} from "bcrypt-ts/browser";
import {ServerMessage} from "@/interfaces/server";
import {User} from "@/store/userInfo";

export const apiLogin = async ({username, password}: {username: string, password: string}): Promise<ServerMessage & { user?: User }> => {
  try {
    return (await axios.post(apiUrls.host + apiUrls.login, {
      username,
      password: (await hash(password, import.meta.env.VITE_FSALT)).slice(import.meta.env.VITE_FSALT.length)
    })).data;
  } catch (e: any) {
    throw {error: true, message: String(e?.response?.data?.message ?? e), delay: 5000}
  }
}

export const apiLogout = async(): Promise<ServerMessage> => {
  return (await axios.get(apiUrls.host + apiUrls.logout)).data;
}

export const apiRegister = async ({username, password}: {username: string, password: string}): Promise<ServerMessage> => {
  try {
    return (await axios.post(apiUrls.host+apiUrls.register, {
      username,
      password: (await hash(password, import.meta.env.VITE_FSALT)).slice(import.meta.env.VITE_FSALT.length)
    })).data;
  } catch (e: any) {
    throw {error: true, message: String(e?.response?.data?.message ?? e), delay: 5000};
  }
}

export const getUserInfo = async (): Promise<User> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.userInfo)).data;
  } catch (e: any) {
    throw {error: true, message: String(e?.response?.data?.message ?? e), delay: 5000};
  }
}