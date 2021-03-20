import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const creatorSchema = new Schema(
	{
		_id: String,
		name: String,
		sumary: String,
	},
	{
		_id: false,
	}
);

const creatorModel = mongoose.model("Creator", creatorSchema);

export default creatorModel;
