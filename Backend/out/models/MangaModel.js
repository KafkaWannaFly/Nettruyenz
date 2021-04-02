"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = exports.MangaModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const mangaSchema = new Schema({
    id: String,
    names: [String],
    cover: String,
    creators: [String],
    tags: [String],
    // rating: Number,
    // rateNum: Number,
    // bookmarks: Number,
    // views: Number,
    status: Number,
    // groups: [String],
    description: String,
    // chapters: [String],
    // comments: [String],
}, {
    timestamps: true,
});
exports.MangaModel = Preloader_1.default.model("Manga", mangaSchema);
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["OnGoing"] = 0] = "OnGoing";
    MangaStatus[MangaStatus["Complete"] = 1] = "Complete";
    MangaStatus[MangaStatus["Dropped"] = 2] = "Dropped";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));
