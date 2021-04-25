import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const commentSchema = new Schema(
	{
		id: String,
		email: String,
		manga: String,
		chapter: String,
		replyTo: String,
		// repiledBy: [String],
		content: String,
	},
	{
		_id: false,
		timestamps: true,
	}
);

export interface UserComment {
	id?: string;
	email: string;
	manga: string;
	chapter?: string;
	replyTo?: string;
	// repliedBy?: string[];
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CommentDto extends UserComment {}

export const userCommentModel = mongoose.model("user-comment", commentSchema);
