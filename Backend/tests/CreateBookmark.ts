import { random } from "faker";
import { Manga, mangaModel } from "../models";
import { Bookmark, bookmarkModel } from "../models/BookmarkModel";
import { User, userModel } from "../models/UserModel";
import { shuffle } from "./Util";

async function createFakeBookmarks() {
	let users = (await userModel.find({}).lean().exec()).map((v, i) => {
		return v as User;
	});

	let mangas = (await mangaModel.find({}).lean().exec()).map((v, i) => {
		return v as Manga;
	});

	users.forEach(async (user, index) => {
		let mangaNum = random.number(mangas.length / 2);
		mangas = shuffle(mangas);

		let bookmarks: Bookmark[] = [];
		for (let i = 0; i < mangaNum; i++) {
			let bookmark: Bookmark = {
				manga: mangas[i].id,
				email: user.email,
			};

			bookmarks.push(bookmark);
		}

		await bookmarkModel.insertMany(bookmarks);
		console.log(`${user.email} has followed ${bookmarks.length} mangas`);
	});
}

createFakeBookmarks().then(() => {
	console.log(`Done!`);
});
