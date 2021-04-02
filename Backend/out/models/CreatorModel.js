"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const creatorSchema = new Schema({
    // _id: String,
    name: String,
    // sumary: String,
}, {
// _id: false,
});
exports.CreatorModel = Preloader_1.default.model("Creator", creatorSchema);
// export default creatorModel;
