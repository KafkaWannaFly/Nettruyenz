import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
	{
		// _id: String,
		username: String,
		manga: String,
		isDelete: Boolean,
	},
	{
		// _id: false,
		timestamps: true,
	}
);

export const BookmarkModel = mongoose.model("Bookmark", bookmarkSchema);

export interface Bookmark {
	username: string;
	manga: string;
	id?: string;
	isDelete?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
