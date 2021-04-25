"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
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
            let userDoc = await models_1.userModel.findOne({ email: email }).exec();
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
            let model = new models_1.userModel(user);
            let registeredDoc = await model.save();
            return true;
        }
        catch (error) {
            console.error(error);
        }
        return false;
    },
    resetUserPasswordAsync: async (email, newPassword) => {
        const user = (await exports.UserController.getUserAsync(email));
        user.password = await bcrypt_1.default.hash(newPassword, EnvironmentConstants_1.SALT);
        await models_1.userModel.updateOne({ email: email }, user).exec();
        return user;
    },
};
