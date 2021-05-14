"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaChapterViewDtoOf = exports.mangaChapterViewModel = void 0;
const ChapterModel_1 = require("./ChapterModel");
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const viewSchema = new Schema({
    email: String,
    manga: String,
    chapter: String,
}, {
    timestamps: true,
});
exports.mangaChapterViewModel = Preloader_1.default.model("view", viewSchema);
function mangaChapterViewDtoOf(data) {
    const chapterData = data.briefChapterDto;
    return {
        id: data.id,
        email: data.email,
        manga: data.manga,
        chapter: data.chapter,
        createdAt: data.createdAt,
        briefChapterDto: ChapterModel_1.briefChapterDtoOf(chapterData),
    };
}
exports.mangaChapterViewDtoOf = mangaChapterViewDtoOf;
