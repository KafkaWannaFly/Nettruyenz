import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const groupSchema = new Schema(
	{
		_id: String,
		name: String,
		members: [String],
	},
	{
		_id: false,
	}
);

export interface Group {
	_id: string;
	id?: string;
	name: string;
	members: string[];
}

export const GroupModel = mongoose.model("Group", groupSchema);
