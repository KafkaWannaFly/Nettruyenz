import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	name: String,
});

const tagModel = mongoose.model("Tag", tagSchema);

export default tagModel;
