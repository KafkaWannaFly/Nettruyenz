"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
exports.UserController = {
    /**
     * Find user by username
     * @param email Username
     * @returns user object if found. undefined if not
     */
    getUserAsync: async (email) => {
        try {
            let userDoc = await UserModel_1.UserModel.findOne({ email: email }).exec();
            return userDoc?.toObject();
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Register a new user
     * @param user User object
     * @returns True if success, false if not. Undefined when exception occurs
     */
    registerUserAsync: async (user) => {
        try {
            let existedUser = await exports.UserController.getUserAsync(user.email);
            if (existedUser !== undefined) {
                return false;
            }
            let userModel = new UserModel_1.UserModel(user);
            let registeredDoc = await userModel.save();
            return true;
        }
        catch (error) {
            console.error(error);
        }
    },
    resetUserPasswordAsync: async (email, newPassword) => {
        const user = (await exports.UserController.getUserAsync(email));
        user.password = await bcrypt_1.default.hash(newPassword, EnvironmentConstants_1.SALT);
        await UserModel_1.UserModel.updateOne({ email: email }, user).exec();
        return user;
    },
};
//# sourceMappingURL=UserController.js.map