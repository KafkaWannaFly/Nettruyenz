import { mangaRateModel, MangaRateDto, MangaRate } from "../models";

export const mangaRateController = {
	async rateMangaAsync(email: string, mangaId: string, rate: number) {
		try {
			const mangaRate: MangaRate = {
				email: email,
				manga: mangaId,
				rate: rate,
				isDeleted: false,
			};

			return await new mangaRateModel(mangaRate).save();
		} catch (error) {
			return error;
		}
	},
	async clearMangaRateAsync(email: string, mangaId: string) {
		try {
			return await mangaRateModel
				.updateOne({ email: email, manga: mangaId }, { isDeleted: true })
				.exec();
		} catch (error) {
			return error;
		}
	},
};
