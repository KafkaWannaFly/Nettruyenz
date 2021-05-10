import { date } from "faker";
import { briefChapterDtoOf } from "./ChapterModel";
import { BriefMangaDto } from "./MangaModel";
import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
	{
		// _id: String,
		email: String,
		manga: String,
		isDelete: Boolean,
	},
	{
		// _id: false,
		timestamps: true,
	}
);

export const bookmarkModel = mongoose.model("bookmark", bookmarkSchema);

export interface Bookmark {
	id?: string;
	email: string;
	manga: string;
	isDelete?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BookmarkDto {
	id?: string;
	email: string;
	briefMangaDto: BriefMangaDto;
}

export function bookmarkDtoOf(data: any): BookmarkDto {
	const briefMangaDto = data.briefMangaDto;
	const newestChapter = briefMangaDto.newestChapter;

	return {
		email: data.email,
		briefMangaDto: {
			id: briefMangaDto.id,
			cover: briefMangaDto.cover,
			creators: briefMangaDto.creators,
			description: briefMangaDto.description,
			names: briefMangaDto.names,
			status: briefMangaDto.status,
			tags: briefMangaDto.tags,

			averageRate: briefMangaDto.averageRate,
			bookmarks: briefMangaDto.bookmarks,
			views: briefMangaDto.views,

			updatedAt: briefMangaDto.updatedAt,

			briefChapterDto: briefChapterDtoOf(newestChapter),
		},
	};
}
