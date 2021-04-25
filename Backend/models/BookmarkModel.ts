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

export interface BookmarkDto extends Bookmark {}
