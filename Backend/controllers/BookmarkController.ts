import { Bookmark, bookmarkModel } from "../models";

export const bookmarkController = {
	async saveBookmark(bookmark: Bookmark) {
		await new bookmarkModel(bookmark).save();
	},
};
