"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterModel = void 0;
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
exports.chapterModel = Preloader_1.default.model("Chapter", chapterSchema);
