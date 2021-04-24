"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const CommentModel_1 = require("../models/CommentModel");
async function CreateComment(numComment, atManga, atChapter) {
    let comments = [];
    for (let i = 0; i < numComment; i++) {
        let comment = {
            content: faker_1.default.lorem.words(15),
            email: "kafkawannafly@gmail.com",
            manga: atManga,
        };
        comments.push(comment);
    }
    await CommentModel_1.CommentModel.insertMany(comments);
}
CreateComment(10, "6e5c9054-8ff6-47d1-8c5c-5905683125d3").then(() => { });
//# sourceMappingURL=CreateComments.js.map