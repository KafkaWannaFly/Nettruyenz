import { ChapterDto } from "./ChapterDto";
import { CommentDto } from "./CommentDto";
export enum MangaStatus {
	OnGoing,
	Complete,
	Dropped,
}
export interface CompletedMangaDto{
	id?: string;
	names: string[];
	cover?: string;
	tags?: string[];
	creators?: string[];
	status?: MangaStatus;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	averageRate?: number;
	bookmarks?: number;
	views?: number;

	chapters?: ChapterDto[];
	comments?: CommentDto[];
}