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
	bookmarkDtoOf,
	mangaRateDtoOf,
	MangaChapterViewDto,
	mangaChapterViewDtoOf,
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

	getUserBookmarks: async (email: string): Promise<BookmarkDto[]> => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
			{
				$lookup: {
					from: "mangas",
					localField: "manga",
					foreignField: "id",
					as: "briefMangaDto",
				},
			},
			{
				$set: {
					briefMangaDto: {
						$arrayElemAt: ["$briefMangaDto", 0],
					},
				},
			},
			{
				$lookup: {
					from: "chapters",
					localField: "briefMangaDto.id",
					foreignField: "manga",
					as: "chapterDocs",
				},
			},
			{
				$set: {
					"briefMangaDto.newestChapter": {
						$filter: {
							input: "$chapterDocs",
							as: "chapter",
							cond: {
								$eq: [
									"$$chapter.index",
									{
										$max: "$chapterDocs.index",
									},
								],
							},
						},
					},
				},
			},
			{
				$set: {
					"briefMangaDto.newestChapter": {
						$arrayElemAt: ["$briefMangaDto.newestChapter", 0],
					},
				},
			},
			{
				$lookup: {
					from: "views",
					localField: "manga",
					foreignField: "manga",
					as: "viewDocs",
				},
			},
			{
				$set: {
					"briefMangaDto.views": {
						$size: "$viewDocs",
					},
				},
			},
			{
				$lookup: {
					from: "manga-rates",
					localField: "manga",
					foreignField: "manga",
					as: "mangaRateDocs",
				},
			},
			{
				$set: {
					"briefMangaDto.averageRate": {
						$divide: [
							{
								$sum: "$mangaRateDocs.rate",
							},
							{
								$size: "$mangaRateDocs",
							},
						],
					},
				},
			},
			{
				$lookup: {
					from: "bookmarks",
					localField: "manga",
					foreignField: "manga",
					as: "bookmarkDocs",
				},
			},
			{
				$set: {
					"briefMangaDto.bookmarks": {
						$size: "$bookmarkDocs",
					},
				},
			},
			{
				$lookup: {
					from: "views",
					localField: "briefMangaDto.newestChapter.id",
					foreignField: "chapter",
					as: "chapterViewDocs",
				},
			},
			{
				$set: {
					"briefMangaDto.newestChapter.views": {
						$size: "$chapterViewDocs",
					},
				},
			},
			{
				$unset: [
					"chapterDocs",
					"viewDocs",
					"mangaRateDocs",
					"bookmarkDocs",
					"chapterViewDocs",
				],
			},
		];

		const data: any[] = await bookmarkModel.aggregate(agg).exec();

		let bookmarksDto: BookmarkDto[] = [];

		if (data.length > 0) {
			bookmarksDto = data.map((item) => bookmarkDtoOf(item));
		}

		return bookmarksDto;
	},

	getUserRatesMade: async (email: string): Promise<MangaRate[]> => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
		];

		let ratesMade: MangaRate[] = [];

		let data: any[] = await mangaRateModel.aggregate(agg).exec();

		if (data.length > 0) {
			ratesMade = data.map((item) => mangaRateDtoOf(item));
		}

		return ratesMade;
	},

	getUserViewedChapters: async (
		email: string
	): Promise<MangaChapterViewDto[]> => {
		const agg = [
			{
				$match: {
					email: email,
				},
			},
			{
				$lookup: {
					from: "chapters",
					localField: "chapter",
					foreignField: "id",
					as: "chapterDocs",
				},
			},
			{
				$set: {
					briefChapterDto: {
						$arrayElemAt: ["$chapterDocs", 0],
					},
				},
			},
			{
				$lookup: {
					from: "mangas",
					localField: "manga",
					foreignField: "id",
					as: "mangaDocs",
				},
			},
			{
				$set: {
					"briefChapterDto.mangaNames": {
						$arrayElemAt: ["$mangaDocs.names", 0],
					},
				},
			},
			{
				$unset: ["chapterDocs", "mangaDocs"],
			},
		];

		let mangaChapterViews: MangaChapterViewDto[] = [];

		const data: any[] = await mangaChapterViewModel.aggregate(agg).exec();

		if (data.length > 0) {
			mangaChapterViews = data.map((item) => mangaChapterViewDtoOf(item));
		}

		return mangaChapterViews;
	},

	getUserReadingHistory: async (email: string) => {
		try {
			const mangaDtos: BriefMangaDto[] = [];

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

			for (let each of mangaChapterViews) {
				let viewedAgg = [
					{
						$match: {
							id: each.manga,
						},
					},
				];

				let manga: BriefMangaDto = await mangaModel
					.aggregate(viewedAgg)
					.exec()[0];

				mangaDtos.push(manga);
			}

			for (let i = 0; i < mangaDtos.length; i++) {
				mangaDtos[i].briefChapterDto = ((
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
