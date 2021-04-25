import { Otp, otpModel } from "../models";

export const OtpController = {
	/**
	 * Save value to DB
	 * @param email email
	 * @param code code
	 */
	saveOtpCode: async (email: string, code: number) => {
		let otp: Otp = {
			email: email,
			value: code,
			isUsed: false,
		};

		await new otpModel(otp).save();
	},

	/**
	 * Verifed if OTP is correct. Otp can't be used anymore if it's correct
	 * @param email
	 * @param code
	 * @returns True if success, false otherwise
	 */
	verifyOtp: async (email: string, code: number) => {
		const agg = [
			{
				$match: {
					email: email,
					isUsed: false,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
			{
				$limit: 1,
			},
		];

		const otp: Otp = (await otpModel.aggregate(agg).exec())[0];

		console.log(`Find OTP ${JSON.stringify(otp, null, 4)}`);

		if (otp === undefined) {
			console.log(`OTP is undefined`);
			return false;
		}

		if (otp.value != code) {
			console.log(`Submit wrong code. Submited: ${code}. Actual: ${otp.value}`);
			return false;
		}

		otp.isUsed = true;
		await otpModel
			.findOneAndUpdate({ _id: otp._id }, { isUsed: otp.isUsed })
			.exec();

		console.log(`Reset password successfully`);

		return true;
	},
};
