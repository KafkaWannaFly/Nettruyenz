"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevel = exports.userModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const userSchema = new Schema({
    email: String,
    password: String,
    nickname: String,
    avatar: String,
    level: Number,
    // groups: [String],
    // bookmarks: [String],
    // history: [String],
    // notifications: [String],
    // ratesMade: [String],
}, {
    timestamps: true,
});
exports.userModel = Preloader_1.default.model("user", userSchema);
var UserLevel;
(function (UserLevel) {
    UserLevel[UserLevel["normal"] = 0] = "normal";
    UserLevel[UserLevel["moderator"] = 1] = "moderator";
})(UserLevel = exports.UserLevel || (exports.UserLevel = {}));
