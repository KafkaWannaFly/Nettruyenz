"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importStar(require("faker"));
const models_1 = require("../models");
const UserCommentModel_1 = require("../models/UserCommentModel");
const Util_1 = require("./Util");
// async function CreateComment(
// 	numComment: number,
// 	atManga: string,
// 	atChapter?: string
// ) {
// 	let comments: UserComment[] = [];
// 	for (let i = 0; i < numComment; i++) {
// 		let comment: UserComment = {
// 			content: faker.lorem.words(15),
// 			email: "kafkawannafly@gmail.com",
// 			manga: atManga,
// 		};
// 		comments.push(comment);
// 	}
// 	await userCommentModel.insertMany(comments);
// }
async function createFakeComments() {
    const mangas = (await models_1.mangaModel.find({}).lean().exec()).map((item) => item);
    const userComments = [];
    mangas.forEach(async (manga, index) => {
        const commentNum = faker_1.random.number(10);
        for (let i = 0; i < commentNum; i++) {
            const user = await Util_1.getRandomUser();
            const userComment = {
                email: user.email,
                manga: manga.id,
                content: faker_1.default.lorem.words(faker_1.random.number({ min: 5, max: 15 })),
            };
            userComments.push(userComment);
            console.log(`${userComment.email} commented at ${manga.names[0]}`);
        }
        await UserCommentModel_1.userCommentModel.insertMany(userComments);
    });
    console.log(`Total ${userComments.length} comments has made`);
}
createFakeComments().then(() => {
    console.log(`Done!!`);
});
