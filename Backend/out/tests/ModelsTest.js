"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TagModel_1 = __importDefault(require("../models/TagModel"));
// TagModel.create(tag);
TagModel_1.default.findOne({ name: "Comedy" }).then((doc) => {
    let tag = doc;
    console.log(tag.id);
});
