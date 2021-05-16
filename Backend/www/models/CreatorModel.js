"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatorOf = exports.creatorModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const creatorSchema = new Schema({
    name: String,
});
exports.creatorModel = Preloader_1.default.model("creator", creatorSchema);
function creatorOf(data) {
    return {
        name: data.creator,
    };
}
exports.creatorOf = creatorOf;
