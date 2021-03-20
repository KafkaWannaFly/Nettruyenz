import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const commentSchema = new Schema(
	{
		_id: String,
		chapter: Id,
		reply: Id,
		content: String,
	},
	{
		_id: false,
		timestamps: true,
	}
);

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
