"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        user: EnvironmentConstants_1.EMAIL_USERNAME,
        pass: EnvironmentConstants_1.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
});
exports.otpService = {
    /**
     * Send an OTP verification to some one
     * @param email Received mail address
     * @param opt Auto generate if not defined
     * @returns OTP code that we have sent
     */
    async sendOtp(email, otp) {
        const optCode = otp ? otp : parseInt((Math.random() * 1000000).toString());
        console.log(`Generate OTP: ${optCode}`);
        const html = "<h3>OTP for verification is </h3>" +
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
