import { User, UserModel } from "../models/UserModel";

export const UserController = {
	/**
	 * Find user by username
	 * @param username Username
	 * @returns user object if found. undefined if not
	 */
	getUserAsync: async (username: string) => {
		try {
			let userDoc = await UserModel.findOne({ username: username }).exec();
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
			let existedUser = await UserController.getUserAsync(user.username);
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
