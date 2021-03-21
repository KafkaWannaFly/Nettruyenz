import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const creatorSchema = new Schema(
	{
		// _id: String,
		name: String,
		// sumary: String,
	},
	{
		// _id: false,
	}
);

export interface Creator {
	_id?: string;
	id?: string;
	name: string;
	// sumary: string;
}

export const CreatorModel = mongoose.model("Creator", creatorSchema);

// export default creatorModel;
