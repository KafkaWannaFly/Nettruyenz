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

export interface UserCommentDto extends UserComment {}

export function commentDtoOf(data: any): UserComment {
	return {
		id: data.id,
		email: data.email,
		manga: data.manga,
		chapter: data.chapter,
		content: data.content,
		createdAt: data.createdAt,
		replyTo: data.replyTo,
	};
}

export const userCommentModel = mongoose.model("user-comment", commentSchema);
