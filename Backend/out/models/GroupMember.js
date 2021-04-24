"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberModel = void 0;
const Preloader_1 = __importDefault(require("./Preloader"));
const Schema = Preloader_1.default.Schema;
const groupMemberSchema = new Schema({
    email: String,
    group: String,
});
exports.GroupMemberModel = Preloader_1.default.model("GroupMember", groupMemberSchema);
//# sourceMappingURL=GroupMember.js.map