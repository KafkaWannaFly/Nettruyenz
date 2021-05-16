"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = exports.tagDtoOf = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const tagSchema = new Schema({
    // id: String,
    name: String,
});
function tagDtoOf(data) {
    return {
        name: data.tag,
    };
}
exports.tagDtoOf = tagDtoOf;
exports.tagModel = Preloader_1.default.model("tag", tagSchema);
