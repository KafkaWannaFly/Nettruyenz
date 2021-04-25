"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const notificationSchema = new Schema({
    id: String,
    url: String,
    isRead: Boolean,
    email: String,
    message: String,
}, {
    timestamps: true,
});
exports.notificationModel = Preloader_1.default.model("notification", notificationSchema);
