"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const otpSchema = new Schema({
    email: String,
    value: Number,
    isUsed: Boolean,
}, {
    timestamps: true,
});
exports.otpModel = Preloader_1.default.model("otp", otpSchema);
