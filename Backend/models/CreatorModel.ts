import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
	name: String,
	sumary: String,
});

const creatorModel = mongoose.model("Creator", creatorSchema);

export default creatorModel;
