import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const mangaCreatorSchema = new Schema({
	manga: String,
	creator: String,
});

export const mangaCreatorModel = mongoose.model(
	"manga-creator",
	mangaCreatorSchema
);

export interface MangaCreator {
	id?: string;
	manga: string; // manga id
	creator: string; // creator name
}

// export interface MangaCreatorDto extends MangaCreator {}
