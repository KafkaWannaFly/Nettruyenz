"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const userSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    avatar: String,
    level: Number,
    groups: [Id],
    bookmarks: [Id],
    history: [Id],
    notifications: [Id],
    ratesMade: [Id],
}, {
    timestamps: true,
});
const userModel = Preloader_1.default.model("User", userSchema);
exports.default = userModel;
