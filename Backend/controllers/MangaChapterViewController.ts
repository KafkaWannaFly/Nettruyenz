import { MangaChapterView, mangaChapterViewModel } from "../models";
import { userController } from "../controllers/UserController";

export const mangaChapterViewController = {
	async createMangaChapterView(
		mangaId: string,
		chapterId: string,
		email?: string
	) {
		const mangaChapterView: MangaChapterView = {
			chapter: chapterId,
			manga: mangaId,
			email: email,
		};

		const mangaChapterViewDoc = await new mangaChapterViewModel(
			mangaChapterView
		).save();

		return mangaChapterViewDoc;
	},
};
