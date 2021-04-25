import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const groupSchema = new Schema({
	id: String,
	name: String,
	// members: [String],
});

export interface Group {
	id?: string;
	name: string;
}

export interface GroupDto extends Group {
	members?: string[];
}

export const groupModel = mongoose.model("group", groupSchema);
