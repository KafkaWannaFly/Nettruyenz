"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkDtoOf = exports.bookmarkModel = void 0;
const ChapterModel_1 = require("./ChapterModel");
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const bookmarkSchema = new Schema({
    // _id: String,
    email: String,
    manga: String,
    isDelete: Boolean,
}, {
    // _id: false,
    timestamps: true,
});
exports.bookmarkModel = Preloader_1.default.model("bookmark", bookmarkSchema);
function bookmarkDtoOf(data) {
    const briefMangaDto = data.briefMangaDto;
    const newestChapter = briefMangaDto.newestChapter;
    return {
        email: data.email,
        briefMangaDto: {
            id: briefMangaDto.id,
            cover: briefMangaDto.cover,
            creators: briefMangaDto.creators,
            description: briefMangaDto.description,
            names: briefMangaDto.names,
            status: briefMangaDto.status,
            tags: briefMangaDto.tags,
            averageRate: briefMangaDto.averageRate,
            bookmarks: briefMangaDto.bookmarks,
            views: briefMangaDto.views,
            updatedAt: briefMangaDto.updatedAt,
            briefChapterDto: ChapterModel_1.briefChapterDtoOf(newestChapter),
        },
    };
}
exports.bookmarkDtoOf = bookmarkDtoOf;
