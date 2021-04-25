import express from "express";
import { OtpController } from "../controllers/OtpController";
import { UserController } from "../controllers/UserController";
import { UserDto } from "../models";
import { otpService } from "../services/OtpService";

const route = express.Router();

// Get OTP code
route.get("/", async (req, res) => {
	try {
		const email = req.query.email as string;

		if (email === undefined || email.length == 0) {
			res.json({
				error: "Empty email",
			});
		}

		console.log(`Received email: ${email}`);

		const sentCode = await otpService.sendOtp(email);
		await OtpController.saveOtpCode(email, sentCode);

		console.log(`Get OTP: ${{ email, sentCode }}`);

		res.status(200).json({ message: `Send OTP to ${email}` });
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

// Submit OTP code and reset password
route.post("/", async (req, res) => {
	try {
		const { email, code, newPassword } = req.body;
		const isSuccess = await OtpController.verifyOtp(email, code);

		if (isSuccess) {
			const user: UserDto = (await UserController.resetUserPasswordAsync(
				email,
				newPassword
			)) as UserDto;
			res.json(user);
		} else {
			res.json({ error: "Wrong OTP" });
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

const forgotPasswordRoute = route;
export default forgotPasswordRoute;
