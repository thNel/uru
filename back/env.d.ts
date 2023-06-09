export {};

declare global {
  namespace NodeJS {
    // noinspection JSUnusedGlobalSymbols
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      DB_HOST?: string;
      DB_PORT?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
      FSALT?: string;
      JWT_SECRET?: string,
      JWT_EXPIRES?: string,
      STEAM_APIKEY?: string,
      APP_HOST?: string,
      SERVER_HOST?: string,
      SERVER_IP?: string,
      COOKIE_SIGN?: string,
    }
  }
}