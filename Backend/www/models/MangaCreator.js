"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaCreatorModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const mangaCreatorSchema = new Schema({
    manga: String,
    creator: String,
});
exports.mangaCreatorModel = Preloader_1.default.model("manga-creator", mangaCreatorSchema);
