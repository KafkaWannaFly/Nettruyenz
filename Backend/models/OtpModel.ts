import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const otpSchema = new Schema(
	{
		email: String,
		value: Number,
		isUsed: Boolean,
	},
	{
		timestamps: true,
	}
);

export const otpModel = mongoose.model("otp", otpSchema);

export interface Otp {
	_id?: string;
	email: string;
	value: number;
	isUsed: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
