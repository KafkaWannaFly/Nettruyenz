import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
	email: String,
	group: String,
});

export const GroupMemberModel = mongoose.model(
	"GroupMember",
	groupMemberSchema
);

export interface GroupMember {
	id?: string;
	email: string;
	group: string;
}
