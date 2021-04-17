"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserModel_1 = require("../models/UserModel");
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
};
