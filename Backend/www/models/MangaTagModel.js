"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaTagModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const mangaTagSchema = new Schema({
    tag: String,
    manga: String,
});
exports.mangaTagModel = Preloader_1.default.model("manga-tag", mangaTagSchema);
