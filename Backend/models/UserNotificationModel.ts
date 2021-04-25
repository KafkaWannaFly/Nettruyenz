import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
	{
		id: String,
		url: String,
		isRead: Boolean,
		email: String,
		message: String,
	},
	{
		timestamps: true,
	}
);

export const notificationModel = mongoose.model(
	"notification",
	notificationSchema
);
export interface UserNotification {
	id: string;
	url: string;
	email: string;
	isRead: boolean;
	message: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserNotificationDto extends UserNotification {}
