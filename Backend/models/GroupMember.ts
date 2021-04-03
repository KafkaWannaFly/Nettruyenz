import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
	username: String,
	group: String,
});

export const GroupMemberModel = mongoose.model(
	"GroupMember",
	groupMemberSchema
);

export interface GroupMember {
	id?: string;
	username: string;
	group: string;
}
