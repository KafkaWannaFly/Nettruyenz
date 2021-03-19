"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const commentSchema = new Schema({
    chapter: Id,
    reply: Id,
    content: String,
}, {
    timestamps: true,
});
const commentModel = Preloader_1.default.model("Comment", commentSchema);
exports.default = commentModel;
