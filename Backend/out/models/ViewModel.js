"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const viewSchema = new Schema({
    email: String,
    manga: String,
    chapter: String,
}, {
    timestamps: true,
});
exports.ViewModel = Preloader_1.default.model("View", viewSchema);
