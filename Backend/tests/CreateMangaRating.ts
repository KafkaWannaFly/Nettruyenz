import { random } from "faker";
import { Manga, mangaModel } from "../models/MangaModel";
import { MangaRate, mangaRateModel } from "../models/MangaRateModel";
import { User, userModel } from "../models/UserModel";
import { shuffle } from "./CreateBookmark";

async function createMangaRating() {
	let users = (await userModel.find({}).lean().exec()).map((v, i) => {
		return v as User;
	});

	let mangas = (await mangaModel.find({}).lean().exec()).map((v, i) => {
		return v as Manga;
	});

	users.forEach(async (user, index) => {
		let mangaNum = random.number(mangas.length);
		mangas = shuffle(mangas);

		let mangaRates: MangaRate[] = [];
		for (let i = 0; i < mangaNum; i++) {
			let mangaRate: MangaRate = {
				manga: mangas[i].id,
				rate: random.number(5),
				email: user.email,
				isDeleted: false,
			};

			mangaRates.push(mangaRate);
		}

		await mangaRateModel.insertMany(mangaRates);
		console.log(`${user.nickname} has rated ${mangaRates.length} mangas`);
	});
}

createMangaRating().then(() => {
	console.log(`Done!!`);
});
