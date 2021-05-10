import { BriefChapterDto } from ".";
import { briefChapterDtoOf } from "./ChapterModel";
import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const viewSchema = new Schema(
	{
		email: String,
		manga: String,
		chapter: String,
	},
	{
		timestamps: true,
	}
);

export const mangaChapterViewModel = mongoose.model("view", viewSchema);

export interface MangaChapterView {
	id?: string;
	email: string;
	manga: string;
	chapter: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface MangaChapterViewDto extends MangaChapterView {
	briefChapterDto: BriefChapterDto;
}

export function mangaChapterViewDtoOf(data: any): MangaChapterViewDto {
	const chapterData = data.briefChapterDto;

	return {
		id: data.id,
		email: data.email,
		manga: data.manga,
		chapter: data.chapter,
		createdAt: data.createdAt,
		briefChapterDto: briefChapterDtoOf(chapterData),
	};
}
