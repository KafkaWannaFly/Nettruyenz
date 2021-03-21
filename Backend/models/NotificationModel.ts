import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
	{
		_id: String,
		url: String,
		isRead: Boolean,
		username: String,
		message: String,
	},
	{
		_id: false,
		timestamps: true,
	}
);

export const NotificationModel = mongoose.model(
	"Notification",
	notificationSchema
);
export interface Notification {
	_id: string;
	url: string;
	username: string;
	isRead: boolean;
	message: string;
	createdAt?: Date;
	updatedAt?: Date;
}
