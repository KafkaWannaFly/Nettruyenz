import faker from "faker";
import { Comment, CommentModel } from "../models/CommentModel";
async function CreateComment(
	numComment: number,
	atManga: string,
	atChapter?: string
) {
	let comments: Comment[] = [];
	for (let i = 0; i < numComment; i++) {
		let comment: Comment = {
			content: faker.lorem.words(15),
			email: "kafkawannafly@gmail.com",
			manga: atManga,
		};

		comments.push(comment);
	}

	await CommentModel.insertMany(comments);
}

CreateComment(10, "6e5c9054-8ff6-47d1-8c5c-5905683125d3").then(() => {});
