export const apiUrls = {
  host: import.meta.env.DEV ? 'http://localhost:6969/v1' : import.meta.env.VITE_HOST,
  login: '/auth/login',
  logout: '/auth/logout',
  steamLogin: '/auth/steam',
  register: '/auth/register',
  userInfo: '/user/profile',
  adminPrefix: '/admin',
  rouletteDo: '/win',
  itemsOperation: '/items',
  itemsExcluded: '/excluded',
  skinsOperation: '/skins',
  skinsDefault: '/skins/default',
  itemSteamIconUrl: 'https://www.rustedit.io/images/imagelibrary/',
  itemDefaultIconUrl: '/media/items/',
  defaultIconExtension: '.png',
  skinSteamIconUrl: 'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/'
}