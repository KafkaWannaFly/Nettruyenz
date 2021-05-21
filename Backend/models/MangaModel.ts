import { BriefChapterDto, briefChapterDtoOf, ChapterDto } from "./ChapterModel";
import {
	commentDtoOf as userCommentDtoOf,
	UserCommentDto,
} from "./UserCommentModel";
import mongoose from "./Preloader";
import { creatorOf } from "./CreatorModel";
import { tagDtoOf } from "./TagModel";
const Schema = mongoose.Schema;

const mangaSchema = new Schema(
	{
		id: String,
		names: [String],
		cover: String,
		// creators: [String],
		// tags: [String],
		status: Number,
		description: String,
	},
	{
		timestamps: true,
	}
);

export const mangaModel = mongoose.model("manga", mangaSchema);

export enum MangaStatus {
	OnGoing,
	Complete,
	Dropped,
}

export interface Manga {
	id: string;
	names: string[];
	cover: string;

	status?: MangaStatus;
	description: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface MangaDto {
	id: string;
	names: string[];
	cover: string;

	status?: MangaStatus;
	description: string;

	chapterDto: ChapterDto;
}

export interface BriefMangaDto {
	id: string;
	names: string[];
	cover: string;
	tags?: string[];
	creators: string[];
	description: string;
	status: MangaStatus;

	averageRate?: number;
	bookmarks?: number;
	views?: number;

	briefChapterDto?: BriefChapterDto;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface CompletedMangaDto {
	id: string;
	names: string[];
	cover: string;
	tags?: string[];
	creators?: string[];
	status?: MangaStatus;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;

	averageRate?: number;
	bookmarks?: number;
	views?: number;

	briefChapterDtos: BriefChapterDto[];
	userCommentDtos?: UserCommentDto[];
}

export function completeMangaDtoOf(data: any): CompletedMangaDto {
	const chapterDocs = data.chapterDocs as any[];
	const tagDocs = data.tagDocs as any[];
	const creatorDocs = data.creatorDocs as any[];
	const commentDocs = data.commentDocs as any[];

	return {
		id: data.id,
		names: data.names,
		cover: data.cover,
		description: data.description,
		creators:
			creatorDocs.length > 0
				? creatorDocs.map((item) => creatorOf(item).name)
				: [],
		tags: tagDocs.length > 0 ? tagDocs.map((item) => tagDtoOf(item).name) : [],
		status: data.status,

		createdAt: data.createdAt,
		updatedAt: data.updatedAt,

		averageRate: data.averageRate,
		bookmarks: data.bookmarks,
		views: data.views,

		briefChapterDtos:
			chapterDocs.length > 0
				? chapterDocs.map((item) => briefChapterDtoOf(item))
				: [],
		userCommentDtos:
			commentDocs?.length > 0
				? commentDocs.map((item) => userCommentDtoOf(item))
				: [],
	};
}

export function briefMangaDtoOf(data: any): BriefMangaDto {
	const chapterData = data.briefChapterDto;

	return {
		id: data.id,
		cover: data.cover,
		creators: data.creators,
		description: data.description,
		names: data.names,
		status: data.status,
		tags: data.tags,

		averageRate: data.averageRate,
		bookmarks: data.bookmarks,
		views: data.views,

		briefChapterDto: briefChapterDtoOf(chapterData),

		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}
