import nodemailer from "nodemailer";
import {
	EMAIL_PASSWORD,
	EMAIL_USERNAME,
} from "../constants/EnvironmentConstants";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	service: "Gmail",
	auth: {
		user: EMAIL_USERNAME,
		pass: EMAIL_PASSWORD,
	},
	tls: { rejectUnauthorized: false },
});

export const otpService = {
	/**
	 * Send an OTP verification to some one
	 * @param email Received mail address
	 * @param opt Auto generate if not defined
	 * @returns OTP code that we have sent
	 */
	async sendOtp(email: string, otp?: number) {
		const optCode = otp ? otp : parseInt((Math.random() * 1000000).toString());

		console.log(`Generate OTP: ${optCode}`);

		const html =
			"<h3>OTP for verification is </h3>" +
			"<h1 style='font-weight:bold;'>" +
			optCode +
			"</h1>";

		await transporter.sendMail({
			// from: "HCMUS Sorcerers",
			to: email,
			subject: "Nettruyenz Verification Code",
			html: html,
		});

		console.log(`Send code to ${email}`);

		return optCode;
	},
};
