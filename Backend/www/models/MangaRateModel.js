"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaRateDtoOf = exports.mangaRateModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const rateSchema = new Schema({
    // _id: String,
    email: String,
    manga: String,
    rate: Number,
    isDeleted: Boolean,
}, {
    // _id: false,
    timestamps: true,
});
exports.mangaRateModel = Preloader_1.default.model("manga-rate", rateSchema);
function mangaRateDtoOf(data) {
    return {
        email: data.email,
        isDeleted: data.isDeleted,
        rate: data.rate,
        manga: data.manga,
    };
}
exports.mangaRateDtoOf = mangaRateDtoOf;
