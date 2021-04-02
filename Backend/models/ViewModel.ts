import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const viewSchema = new Schema(
	{
		username: String,
		manga: String,
		chapter: String,
	},
	{
		timestamps: true,
	}
);

export const ViewModel = mongoose.model("View", viewSchema);

export interface MangaChapterView {
	id?: string;
	username?: string;
	manga: string;
	chapter: string;
	// isDelete?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
