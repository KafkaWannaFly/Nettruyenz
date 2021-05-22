"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.briefMangaDtoOf = exports.completeMangaDtoOf = exports.MangaStatus = exports.mangaModel = void 0;
const ChapterModel_1 = require("./ChapterModel");
const UserCommentModel_1 = require("./UserCommentModel");
const Preloader_1 = __importDefault(require("./Preloader"));
const CreatorModel_1 = require("./CreatorModel");
const TagModel_1 = require("./TagModel");
const Schema = Preloader_1.default.Schema;
const mangaSchema = new Schema({
    id: String,
    names: [String],
    cover: String,
    // creators: [String],
    // tags: [String],
    status: Number,
    description: String,
}, {
    timestamps: true,
});
exports.mangaModel = Preloader_1.default.model("manga", mangaSchema);
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["OnGoing"] = 0] = "OnGoing";
    MangaStatus[MangaStatus["Complete"] = 1] = "Complete";
    MangaStatus[MangaStatus["Dropped"] = 2] = "Dropped";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));
function completeMangaDtoOf(data) {
    const chapterDocs = data.chapterDocs;
    const tagDocs = data.tagDocs;
    const creatorDocs = data.creatorDocs;
    const commentDocs = data.commentDocs;
    return {
        id: data.id,
        names: data.names,
        cover: data.cover,
        description: data.description,
        creators: creatorDocs.length > 0
            ? creatorDocs.map((item) => CreatorModel_1.creatorOf(item).name)
            : [],
        tags: tagDocs.length > 0 ? tagDocs.map((item) => TagModel_1.tagDtoOf(item).name) : [],
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        averageRate: data.averageRate,
        bookmarks: data.bookmarks,
        views: data.views,
        briefChapterDtos: chapterDocs.length > 0
            ? chapterDocs.map((item) => ChapterModel_1.briefChapterDtoOf(item))
            : [],
        userCommentDtos: commentDocs?.length > 0
            ? commentDocs.map((item) => UserCommentModel_1.commentDtoOf(item))
            : [],
    };
}
exports.completeMangaDtoOf = completeMangaDtoOf;
function briefMangaDtoOf(data) {
    const chapterData = data.briefChapterDto;
    return {
        id: data.id,
        cover: data.cover,
        creators: data.creators,
        description: data.description,
        names: data.names,
        status: data.status,
        tags: data.tags,
        averageRate: data.averageRate,
        bookmarks: data.bookmarks,
        views: data.views,
        briefChapterDto: ChapterModel_1.briefChapterDtoOf(chapterData),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}
exports.briefMangaDtoOf = briefMangaDtoOf;
