import {
	Bookmark,
	BookmarkDto,
	bookmarkModel,
	BriefMangaDto,
	groupModel,
	mangaModel,
	chapterModel,
	ChapterDto,
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

	getUserFollowedList: async (email: string) => {
		try{
			const mangaDtos: BriefMangaDto[] = []

			const agg = [
				{
					$match: {
						email: email,
					},
				},
			];

			const bookmarks: Bookmark[] = await bookmarkModel.aggregate(agg).exec();

			for(let each of bookmarks){
				let bookmarkAgg = [
					{
						$match: {
							id: each.manga,
						},
					},
				];

				let manga: BriefMangaDto = await mangaModel.aggregate(bookmarkAgg).exec()[0];

				mangaDtos.push(manga);
			}

			for (let i = 0; i < mangaDtos.length; i++) {
				mangaDtos[i].newestChapter = ((
					await chapterModel
						.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as unknown) as ChapterDto;

				mangaDtos[i].averageRate = (
					await getMangaRating(mangaDtos[i].id)
				).average;

				mangaDtos[i].views = await mangaChapterViewModel
					.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				mangaDtos[i].bookmarks = await bookmarkModel
					.find({
						manga: mangaDtos[i].id,
					})
					.countDocuments()
					.exec();
			}

			return mangaDtos.sort((a, b) => {
				if (b.createdAt === undefined || a.createdAt === undefined) {
					return -1;
				}
				return b.createdAt.getSeconds() - a.createdAt.getSeconds();
			});
		} catch (error) {
			console.error(error);
		}
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
					isDeleted: false,
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

	getUserReadingHistory: async (email: string) => {
		try{
			const mangaDtos: BriefMangaDto[] = []

			const agg = [
				{
					$match: {
						email: email,
						isDeleted: false,
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

			for(let each of mangaChapterViews){
				let viewedAgg = [
					{
						$match: {
							id: each.manga,
						},
					},
				];

				let manga: BriefMangaDto = await mangaModel.aggregate(viewedAgg).exec()[0];

				mangaDtos.push(manga);
			}

			for (let i = 0; i < mangaDtos.length; i++) {
				mangaDtos[i].newestChapter = ((
					await chapterModel
						.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as unknown) as ChapterDto;
			}

			return mangaDtos.sort((a, b) => {
				if (b.createdAt === undefined || a.createdAt === undefined) {
					return -1;
				}
				return b.createdAt.getSeconds() - a.createdAt.getSeconds();
			});
		} catch (error) {
			console.error(error);
		}
	},
};

interface IMangaRate {
	_id?: string;
	sum: number;
	numRate: number;
	average: number;
}

async function getMangaRating(id: string) {
	const rateAgg = [
		{
			$group: {
				_id: "$manga",
				numRate: {
					$sum: 1,
				},
				sum: {
					$sum: "$rate",
				},
			},
		},
		{
			$match: {
				_id: id,
			},
		},
	];

	let mangaRate: IMangaRate = (
		await mangaRateModel.aggregate(rateAgg).exec()
	)[0];
	mangaRate.average = mangaRate.sum / mangaRate.numRate;
	return mangaRate;
}
