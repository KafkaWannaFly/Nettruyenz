"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OtpController_1 = require("../controllers/OtpController");
const UserController_1 = require("../controllers/UserController");
const OtpService_1 = require("../services/OtpService");
const route = express_1.default.Router();
// Get OTP code
route.get("/", async (req, res) => {
    try {
        const email = req.query.email;
        if (email === undefined || email.length == 0) {
            res.json({
                error: "Empty email",
            });
        }
        console.log(`Received email: ${email}`);
        const sentCode = await OtpService_1.otpService.sendOtp(email);
        await OtpController_1.OtpController.saveOtpCode(email, sentCode);
        console.log(`Get OTP: ${{ email, sentCode }}`);
        res.status(200).json({ message: `Send OTP to ${email}` });
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
// Submit OTP code and reset password
route.post("/", async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const isSuccess = await OtpController_1.OtpController.verifyOtp(email, code);
        if (isSuccess) {
            const user = (await UserController_1.userController.resetUserPasswordAsync(email, newPassword));
            res.json(user);
        }
        else {
            res.json({ error: "Wrong OTP" });
        }
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
const forgotPasswordRoute = route;
exports.default = forgotPasswordRoute;
