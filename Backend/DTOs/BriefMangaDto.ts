import { Manga, MangaStatus } from "../models/MangaModel";
import { ChapterDto } from "./ChapterDto";

export interface BriefMangaDto extends Manga {
	// id: string;
	// name: string[];
	// cover: string;
	// tags: string[];
	// creators: string[];
	// description: string;
	// status: MangaStatus;

	averageRate?: number;
	bookmarks?: number;
	views?: number;

	newestChapter?: ChapterDto;
}
