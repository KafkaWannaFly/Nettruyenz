import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const tagSchema = new Schema(
	{
		_id: String,
		name: String,
	},
	{
		_id: false,
	}
);

const tagModel = mongoose.model("Tag", tagSchema);

export default tagModel;
