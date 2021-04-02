import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	id: String,
	name: String,
});

export interface Tag {
	id: string;
	name: string;
}

export const TagModel = mongoose.model("Tag", tagSchema);
