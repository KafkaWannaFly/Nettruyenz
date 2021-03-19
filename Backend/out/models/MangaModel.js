"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const mangaSchema = new Schema({
    names: [String],
    cover: String,
    creators: [Id],
    tags: [Id],
    rating: Number,
    rateNum: Number,
    bookmarks: Number,
    views: Number,
    status: Number,
    groups: [Id],
    description: String,
    chapters: [Id],
    comments: [Id],
});
const mangaModel = Preloader_1.default.model("Manga", mangaSchema);
exports.default = mangaModel;
