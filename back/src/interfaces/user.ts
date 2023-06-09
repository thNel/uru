export interface UserPassPair {
  username: string,
  password: string,
}

export interface JwtPayload {
  username: string,
  iat: number,
  exp: number
}

export interface SteamProfile {
  provider: string;
  _json: {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    realname: string;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
    loccountrycode: string;
    locstatecode: string;
  };
  id: string;
  displayName: string;
  photos: { value: string }[];
}