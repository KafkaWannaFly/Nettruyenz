"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT = exports.SECRET = exports.PORT = exports.EMAIL_PASSWORD = exports.EMAIL_USERNAME = exports.DB_NAME = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USERNAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_NAME = process.env.DB_NAME;
exports.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.PORT = env.PORT;
exports.SECRET = env.SECRET;
exports.SALT = parseInt(env.SALT);
