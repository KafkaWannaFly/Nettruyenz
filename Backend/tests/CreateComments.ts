import faker, { random } from "faker";
import { Manga, mangaModel } from "../models";
import { UserComment, userCommentModel } from "../models/UserCommentModel";
import { getRandomUser } from "./Util";

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
	const mangas: Manga[] = (await mangaModel.find({}).lean().exec()).map(
		(item) => item as Manga
	);
	const userComments: UserComment[] = [];

	mangas.forEach(async (manga, index) => {
		const commentNum = random.number(10);

		for (let i = 0; i < commentNum; i++) {
			const user = await getRandomUser();
			const userComment: UserComment = {
				email: user.email,
				manga: manga.id,
				content: faker.lorem.words(random.number({ min: 5, max: 15 })),
			};

			userComments.push(userComment);

			console.log(`${userComment.email} commented at ${manga.names[0]}`);
		}

		await userCommentModel.insertMany(userComments);
	});

	console.log(`Total ${userComments.length} comments has made`);
}

createFakeComments().then(() => {
	console.log(`Done!!`);
});
