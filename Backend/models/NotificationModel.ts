import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
	{
		id: String,
		url: String,
		isRead: Boolean,
		username: String,
		message: String,
	},
	{
		timestamps: true,
	}
);

export const NotificationModel = mongoose.model(
	"Notification",
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
