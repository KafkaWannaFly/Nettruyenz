"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const Id = Schema.Types.ObjectId;
const groupSchema = new Schema({
    id: String,
    name: String,
    // members: [String],
});
exports.groupModel = Preloader_1.default.model("group", groupSchema);
