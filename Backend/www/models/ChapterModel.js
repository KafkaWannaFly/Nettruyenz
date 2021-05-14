"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterModel = exports.chapterDtoOf = exports.briefChapterDtoOf = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const chapterSchema = new Schema({
    id: String,
    images: [String],
    manga: String,
    uploader: String,
    // views: Number,
    // group: String,
    index: Number,
    tittle: String,
}, {
    timestamps: true,
});
function briefChapterDtoOf(data) {
    return {
        id: data.id,
        manga: data.manga,
        index: data.index,
        tittle: data.tittle,
        views: data.views,
        createdAt: data.createdAt,
        mangaNames: data.mangaNames,
    };
}
exports.briefChapterDtoOf = briefChapterDtoOf;
function chapterDtoOf(data) {
    return {
        id: data.id,
        views: data.views,
        manga: data.manga,
        index: data.index,
        images: data.images,
        tittle: data.tittle,
        uploader: data.uploader,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}
exports.chapterDtoOf = chapterDtoOf;
exports.chapterModel = Preloader_1.default.model("Chapter", chapterSchema);
