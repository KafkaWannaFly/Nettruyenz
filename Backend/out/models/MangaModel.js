"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const mangaSchema = new Schema({
    _id: String,
    names: [String],
    cover: String,
    creators: [String],
    tags: [String],
    rating: Number,
    rateNum: Number,
    bookmarks: Number,
    views: Number,
    status: Number,
    groups: [String],
    description: String,
    chapters: [String],
    comments: [String],
}, {
    _id: false,
    timestamps: true,
});
const mangaModel = Preloader_1.default.model("Manga", mangaSchema);
exports.default = mangaModel;
