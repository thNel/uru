import axios from "axios";
import {apiUrls} from "@/constants/api";
import {ItemInfo, SkinDefault, SkinInfo} from "@/interfaces/server";

export const getItemList = async (): Promise<ItemInfo[] | undefined> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.adminPrefix + apiUrls.itemsOperation)).data;
  } catch (e: any) {
    console.error(e);
  }
}

export const getExcludedItemList = async (): Promise<ItemInfo[] | undefined> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.adminPrefix + apiUrls.itemsOperation + apiUrls.itemsExcluded)).data;
  } catch (e: any) {
    console.error(e);
  }
}

export const sendItemList = async (items: ItemInfo[]): Promise<ItemInfo[]> => {
  try {
    return (await axios.put(apiUrls.host + apiUrls.adminPrefix + apiUrls.itemsOperation, {
      items: items.map(item => ({
        id: item.id,
        shortname: item.shortname,
        skinsAvailable: item.skinsAvailable,
        title: item.title,
        winGroup: item.winGroup,
        winCount: item.winCount,
      }))
    })).data
  } catch (e: any) {
    console.error(e);
    return [];
  }
}

export const getSkinList = async (): Promise<SkinInfo[]> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.adminPrefix + apiUrls.skinsOperation)).data;
  } catch (e: any) {
    console.error(e);
    return [];
  }
}

export const getDefaultSkinList = async (): Promise<SkinDefault[]> => {
  try {
    return (await axios.get(apiUrls.host + apiUrls.adminPrefix + apiUrls.skinsDefault)).data;
  } catch (e: any) {
    console.error(e);
    return [];
  }
}

export const addSkin = async (skin: SkinInfo): Promise<SkinInfo | null> => {
  try {
    return (await axios.post(apiUrls.host + apiUrls.adminPrefix + apiUrls.skinsOperation, {
      newSkin: {
        skinId: skin.skinId,
        permission: skin.requiredPermission,
        itemId: skin.item.id,
        collectionId: skin.collection?.id,
      },
      collectionThumbnail: skin.collection?.thumbnailUrl,
      collectionTitle: skin.collection?.title,
    })).data
  } catch (e: any) {
    console.error(e);
    return null
  }
}

export const delSkin = async (skin: SkinInfo): Promise<SkinInfo[]> => {
  try {
    await axios.delete(apiUrls.host + apiUrls.adminPrefix + apiUrls.skinsOperation, {
      data: {
        skinId: skin.skinId
      },
    });
    return await getSkinList();
  } catch (e: any) {
    console.error(e);
    return []
  }
}