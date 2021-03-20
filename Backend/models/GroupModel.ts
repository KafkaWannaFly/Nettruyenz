import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const groupSchema = new Schema(
	{
		_id: String,
		name: String,
		members: [Id],
	},
	{
		_id: false,
	}
);

const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;
