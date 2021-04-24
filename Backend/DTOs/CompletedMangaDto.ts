import { Chapter } from "../models/ChapterModel";
import { CommentDto } from "./CommentDto";
import { Manga, MangaStatus } from "../models/MangaModel";
import { ChapterDto } from "./ChapterDto";

export interface CompletedMangaDto extends Manga {
	// id: string;
	// names: string[];
	// cover: string;
	// tags: string[];
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
