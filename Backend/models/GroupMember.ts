import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
	email: String,
	group: String,
});

export const groupMemberModel = mongoose.model(
	"group-member",
	groupMemberSchema
);

export interface GroupMember {
	id?: string;
	email: string;
	group: string;
}

export interface GroupMemberDto extends GroupMember {}
