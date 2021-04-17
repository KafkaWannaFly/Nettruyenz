import { random } from "faker";
import { Manga, MangaModel } from "../models/MangaModel";
import { MangaRate, RateModel } from "../models/RateModel";
import { User, UserModel } from "../models/UserModel";
import { shuffle } from "./CreateBookmark";

async function createMangaRating() {
	let users = (await UserModel.find({}).lean().exec()).map((v, i) => {
		return v as User;
	});

	let mangas = (await MangaModel.find({}).lean().exec()).map((v, i) => {
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
			};

			mangaRates.push(mangaRate);
		}

		await RateModel.insertMany(mangaRates);
		console.log(`${user.nickname} has rated ${mangaRates.length} mangas`);
	});
}

createMangaRating().then(() => {
	console.log(`Done!!`);
});
