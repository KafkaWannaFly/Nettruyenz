import { ChapterDto } from "./ChapterModel";
import { CommentDto } from "./UserCommentModel";
import mongoose from "./Preloader";
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

export interface BriefMangaDto extends Manga {
	// id: string;
	// name: string[];
	// cover: string;
	tags?: string[];
	// creators: string[];
	// description: string;
	// status: MangaStatus;

	averageRate?: number;
	bookmarks?: number;
	views?: number;

	newestChapter?: ChapterDto;
}

export interface CompletedMangaDto extends Manga {
	// id: string;
	// names: string[];
	// cover: string;
	tags?: string[];
	// creators?: string[];
	// status?: MangaStatus;
	// description: string;
	// createdAt?: Date;
	// updatedAt?: Date;
	averageRate?: number;
	bookmarks?: number;
	views?: number;

	chapters?: ChapterDto[];
	comments?: CommentDto[];
}
