import faker from "faker";
import { UserComment, userCommentModel } from "../models/UserCommentModel";
async function CreateComment(
	numComment: number,
	atManga: string,
	atChapter?: string
) {
	let comments: UserComment[] = [];
	for (let i = 0; i < numComment; i++) {
		let comment: UserComment = {
			content: faker.lorem.words(15),
			email: "kafkawannafly@gmail.com",
			manga: atManga,
		};

		comments.push(comment);
	}

	await userCommentModel.insertMany(comments);
}

CreateComment(10, "6e5c9054-8ff6-47d1-8c5c-5905683125d3").then(() => {});
