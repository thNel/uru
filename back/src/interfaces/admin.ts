export interface ItemEdit {
  id: number,
  shortname: string,
  skinAvailable: boolean,
}

export interface SteamSkin {
  publishedfiledetails: {
    publishedfileid: string | number,
    result: number,
    preview_url: string,
    title: string,
    banned: number,
    ban_reason: string,
  }[]
}