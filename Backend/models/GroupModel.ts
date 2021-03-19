import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const groupSchema = new Schema({
	name: String,
	members: [Id],
});

const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;
