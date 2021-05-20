"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCommentModel = exports.commentDtoOf = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const commentSchema = new Schema({
    id: String,
    email: String,
    manga: String,
    chapter: String,
    replyTo: String,
    // repiledBy: [String],
    content: String,
}, {
    timestamps: true,
});
function commentDtoOf(data) {
    return {
        id: data.id,
        email: data.email,
        manga: data.manga,
        chapter: data.chapter,
        content: data.content,
        createdAt: data.createdAt,
        replyTo: data.replyTo,
    };
}
exports.commentDtoOf = commentDtoOf;
exports.userCommentModel = Preloader_1.default.model("user-comment", commentSchema);
