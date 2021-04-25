"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = exports.mangaModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
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
