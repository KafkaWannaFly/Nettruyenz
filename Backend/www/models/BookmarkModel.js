"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkModel = void 0;
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
