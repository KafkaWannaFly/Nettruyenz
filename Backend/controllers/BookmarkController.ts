import { Bookmark, bookmarkModel } from "../models";

export const bookmarkController = {
	async saveBookmark(bookmark: Bookmark) {
		return await new bookmarkModel(bookmark).save();
	},
};
