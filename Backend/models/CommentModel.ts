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

export interface Comment {
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

export const CommentModel = mongoose.model("Comment", commentSchema);
