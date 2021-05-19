import dotenv from "dotenv";
dotenv.config();

const env = process.env;

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const PORT = env.PORT;

export const SECRET = env.SECRET;

export const SALT = parseInt(env.SALT!);

export const CLOUD_NAME = env.CLOUD_NAME!!;
export const API_KEY = env.API_KEY!!;
export const API_SECRET = env.API_SECRET!!;
export const CLOUDINARY_URL = env.CLOUDINARY_URL!!;
export const UPLOAD_URL = env.UPLOAD_URL!!;
