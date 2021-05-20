import { UserComment, userCommentModel } from "../models";

export const commentController = {
	async saveComment(comment: UserComment) {
		comment.id = Date.now().toString();
		return await new userCommentModel(comment).save();
	},
};
