"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const chapterSchema = new Schema({
    images: [String],
    manga: Id,
    uploader: Id,
    views: Number,
    group: Id,
    index: Number,
    tittle: String,
}, {
    timestamps: true,
});
const chapterModel = Preloader_1.default.model("Chapter", chapterSchema);
exports.default = chapterModel;
