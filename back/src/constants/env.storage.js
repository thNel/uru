"use strict";
exports.__esModule = true;
exports.envData = exports.modes = void 0;
var dotenv = require("dotenv");
dotenv.config({ path: 'config/.env.local' });
var env = process.env;
exports.modes = {
    dev: 'development',
    prod: 'production'
};
exports.envData = {
    isDev: env.NODE_ENV === exports.modes.dev,
    dbHost: env.DB_HOST,
    dbPort: env.DB_PORT,
    dbUser: env.DB_USER,
    dbPass: env.DB_PASSWORD,
    dbName: env.DB_NAME,
    fSalt: env.FSALT,
    jwt: {
        secret: env.JWT_SECRET,
        expires: env.JWT_EXPIRES
    }
};
