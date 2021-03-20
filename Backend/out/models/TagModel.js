"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const tagSchema = new Schema({
    _id: String,
    name: String,
}, {
    _id: false,
});
const tagModel = Preloader_1.default.model("Tag", tagSchema);
exports.default = tagModel;
