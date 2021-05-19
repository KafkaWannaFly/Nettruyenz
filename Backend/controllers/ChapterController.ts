import { Chapter, ChapterDto, chapterDtoOf, chapterModel } from "../models";

export const chapterController = {
	async getChapterById(id: string): Promise<ChapterDto | undefined> {
		const data = await chapterModel.findOne({ id: id }).exec();

		const chapterDto = chapterDtoOf(data);

		return chapterDto;
	},

	async saveChapterAsync(chapter: Chapter) {
		return await new chapterModel(chapter).save();
	},
};
