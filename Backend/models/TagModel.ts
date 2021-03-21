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

export interface Tag {
	id?: string;
	_id: string;
	name: string;
}

export const TagModel = mongoose.model("Tag", tagSchema);
