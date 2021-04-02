import { random } from "faker";
import { Bookmark, BookmarkModel } from "../models/BookmarkModel";
import { Manga, MangaModel } from "../models/MangaModel";
import { User, UserModel } from "../models/UserModel";

export function shuffle(array: any[]) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

async function createFakeBookmarks() {
	let users = (await UserModel.find({}).lean().exec()).map((v, i) => {
		return v as User;
	});

	let mangas = (await MangaModel.find({}).lean().exec()).map((v, i) => {
		return v as Manga;
	});

	users.forEach(async (user, index) => {
		let mangaNum = random.number(mangas.length);
		mangas = shuffle(mangas);

		let bookmarks: Bookmark[] = [];
		for (let i = 0; i < mangaNum; i++) {
			let bookmark: Bookmark = {
				manga: mangas[i].id,
				username: user.username,
			};

			bookmarks.push(bookmark);
		}

		await BookmarkModel.insertMany(bookmarks);
		console.log(`${user.nickname} has followed ${bookmarks.length} mangas`);
	});
}

createFakeBookmarks().then(() => {
	console.log(`Done!`);
});
