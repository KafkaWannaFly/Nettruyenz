import {
	Bookmark,
	BookmarkDto,
	bookmarkModel,
	groupModel,
	MangaChapterView,
	mangaChapterViewModel,
	MangaRate,
	mangaRateModel,
	User,
	userModel,
} from "../models";
import bcrypt from "bcrypt";
import { SALT } from "../constants/EnvironmentConstants";

export const userController = {
	/**
	 * Find user by username
	 * @param email Username
	 * @returns user object if found. undefined if not
	 */
	getUserAsync: async (email: string) => {
		try {
			let userDoc = await userModel.findOne({ email: email }).exec();
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
			let existedUser = await userController.getUserAsync(user.email);
			if (existedUser !== undefined) {
				return false;
			}

			let model = new userModel(user);
			let registeredDoc = await model.save();

			return true;
		} catch (error) {
			console.error(error);
		}
		return false;
	},

	resetUserPasswordAsync: async (email: string, newPassword: string) => {
		const user: User = (await userController.getUserAsync(email)) as User;
		user.password = await bcrypt.hash(newPassword, SALT!);

		await userModel.updateOne({ email: email }, user).exec();
		return user;
	},

	getUserBookmarks: async (email: string): Promise<Bookmark[]> => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
		];

		const bookmarks: Bookmark[] = await bookmarkModel.aggregate(agg).exec();

		return bookmarks;
	},

	getUserRatesMade: async (email: string): Promise<MangaRate[]> => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
		];

		const ratesMade: MangaRate[] = await mangaRateModel.aggregate(agg).exec();

		return ratesMade;
	},

	getUserViewedChapters: async (email: string) => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		];

		const mangaChapterViews: MangaChapterView[] = await mangaChapterViewModel
			.aggregate(agg)
			.exec();

		return mangaChapterViews;
	},
};
