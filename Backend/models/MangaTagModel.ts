import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const mangaTagSchema = new Schema({
	tag: String,
	manga: String,
});

export const mangaTagModel = mongoose.model("manga-tag", mangaTagSchema);

export interface MangaTag {
	id?: string;
	tag: string;
	manga: string;
}

export interface MangaTagDto extends MangaTag {}
