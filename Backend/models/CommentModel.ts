import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const commentSchema = new Schema(
	{
		chapter: Id,
		reply: Id,
		content: String,
	},
	{
		timestamps: true,
	}
);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
