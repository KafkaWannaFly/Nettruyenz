"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const commentSchema = new Schema({
    id: String,
    username: String,
    manga: String,
    chapter: String,
    replyTo: String,
    repiledBy: [String],
    content: String,
}, {
    _id: false,
    timestamps: true,
});
exports.CommentModel = Preloader_1.default.model("Comment", commentSchema);
