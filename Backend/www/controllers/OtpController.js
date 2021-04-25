"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const models_1 = require("../models");
exports.OtpController = {
    /**
     * Save value to DB
     * @param email email
     * @param code code
     */
    saveOtpCode: async (email, code) => {
        let otp = {
            email: email,
            value: code,
            isUsed: false,
        };
        await new models_1.otpModel(otp).save();
    },
    /**
     * Verifed if OTP is correct. Otp can't be used anymore if it's correct
     * @param email
     * @param code
     * @returns True if success, false otherwise
     */
    verifyOtp: async (email, code) => {
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
        const otp = (await models_1.otpModel.aggregate(agg).exec())[0];
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
        await models_1.otpModel
            .findOneAndUpdate({ _id: otp._id }, { isUsed: otp.isUsed })
            .exec();
        console.log(`Reset password successfully`);
        return true;
    },
};
