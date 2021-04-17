import { UserLevel } from "../models/UserModel";
import { NotificationDto } from "./NotificationDto";
import { RateDto } from "./RateDto";

export interface UserDto {
	email: string;
	nickname: string;
	avatar?: string;
	level: UserLevel;

	groups?: string[]; // List of group id
	bookmarks?: string[]; // List of manga id
	history?: string[]; // List of chapters id
	notifications?: NotificationDto[];
	ratesMade?: RateDto[];
}
