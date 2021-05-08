import { Bookmark, BookmarkDto } from "./BookmarkModel";
import { Group } from "./GroupModel";
import mongoose from "./Preloader";
import { MangaRate, MangaRateDto } from "./MangaRateModel";
import { MangaChapterView } from "./MangaChapterViewModel";

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

export const userModel = mongoose.model("user", userSchema);

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
	createdAt?: Date;
}

export interface UserDto extends User {
	groups?: Group[];
	bookmarks?: Bookmark[];
	history?: MangaChapterView[];
	notifications?: Notification[];
	ratesMade?: MangaRateDto[];
}

export function userDtoOf(user: User): UserDto {
	const userDto: UserDto = {
		email: user.email,
		level: user.level,
		nickname: user.nickname,
		avatar: user.avatar,
		password: user.password,
	};

	return userDto;
}
