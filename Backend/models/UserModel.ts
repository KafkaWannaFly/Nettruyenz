import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const userSchema = new Schema(
	{
		email: String,
		password: String,
		nickname: String,
		avatar: String,
		level: Number,
		// groups: [String],
		// bookmarks: [String],
		// history: [String],
		// notifications: [String],
		// ratesMade: [String],
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model("User", userSchema);

export enum UserLevel {
	normal,
	moderator,
}

export interface User {
	email: string;
	password: string;
	nickname: string;
	avatar?: string;
	level: UserLevel;
	// groups?: string[];
	// bookmarks?: string[];
	// history?: string[];
	// notifications?: string[];
	// ratesMade?: string[];
	createdAt?: Date;
}
