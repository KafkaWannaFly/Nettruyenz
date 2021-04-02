import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const groupSchema = new Schema(
	{
		id: String,
		name: String,
		members: [String],
	},
	{}
);

export interface Group {
	id?: string;
	name: string;
	members: string[];
}

export const GroupModel = mongoose.model("Group", groupSchema);
