import { User, UserModel } from "../models/UserModel";

export const UserController = {
	/**
	 * Find user by username
	 * @param email Username
	 * @returns user object if found. undefined if not
	 */
	getUserAsync: async (email: string) => {
		try {
			let userDoc = await UserModel.findOne({ email: email }).exec();
			return userDoc?.toObject() as User;
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Register a new user
	 * @param user User object
	 * @returns True if success, false if not. Undefined when exception occurs
	 */
	registerUserAsync: async (user: User) => {
		try {
			let existedUser = await UserController.getUserAsync(user.email);
			if (existedUser !== undefined) {
				return false;
			}

			let userModel = new UserModel(user);
			let registeredDoc = await userModel.save();

			return true;
		} catch (error) {
			console.error(error);
		}
	},
};
