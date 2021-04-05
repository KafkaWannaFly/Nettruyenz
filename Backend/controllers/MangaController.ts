import { ChapterDto } from "../DTOs/ChapterDto";
import { BriefMangaDto } from "../DTOs/BriefMangaDto";
import { BookmarkModel } from "../models/BookmarkModel";
import { ChapterModel } from "../models/ChapterModel";
import { Manga, MangaModel } from "../models/MangaModel";
import { RateModel } from "../models/RateModel";
import { ViewModel } from "../models/ViewModel";

export const MangaController = {
	/**
	 * Get top most view mangas in a period of time
	 * @param top Top first mangas
	 * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
	 */
	getTopMostViewAsync: async (top: number, period: string = "all") => {
		interface IMangeView {
			_id?: string;
			views?: number;
		}

		try {
			let aggregationStatements: any[] = [
				{
					$group: {
						_id: "$manga",
						views: {
							$sum: 1,
						},
					},
				},
				{
					$sort: {
						views: -1,
					},
				},
				{
					$limit: top,
				},
			];

			let mangaViewDocs: IMangeView[] = [];
			let mangaDtos: BriefMangaDto[] = [];

			if (period === "weekly") {
				let weeklyFilter = getWeeklyFilter();
				aggregationStatements = [weeklyFilter, ...aggregationStatements];
			} else if (period === "monthly") {
				let monthlyFilter = getMonthlyFilter();
				aggregationStatements = [monthlyFilter, ...aggregationStatements];
			} else {
				// Have nothing to do here :))
			}

			// Most view mangas
			mangaViewDocs = await ViewModel.aggregate(aggregationStatements).exec();

			// Find them in Manga table
			mangaDtos = (
				await MangaModel.find()
					.where("id")
					.in(mangaViewDocs.map((v) => v._id))
					.lean()
					.exec()
			).map((manga, index) => {
				let dto = (manga as unknown) as BriefMangaDto;
				return dto;
			});

			// Set properties: views, bookmakrs and rate
			for (let i = 0; i < mangaDtos.length; i++) {
				let mangaView = mangaViewDocs.find(
					(item) => item._id === mangaDtos[i].id
				);
				// console.log(mangaView);

				mangaDtos[i].views = mangaView?.views;
				mangaDtos[i].bookmarks = await BookmarkModel.find({
					manga: mangaDtos[i].id,
				})
					.countDocuments()
					.exec();

				let mangaRate = await getMangaRating(mangaDtos[i].id);

				// console.log(
				// 	`${mangaDtos[i].names[0]} - ${JSON.stringify(mangaRate, null, 4)}`
				// );

				mangaDtos[i].averageRate = mangaRate.sum / mangaRate.numRate;

				// Give manga lastest chapter
				let chapter = (await ChapterModel.find()
					.sort({ index: -1 })
					.limit(1)
					.exec()) as ChapterDto[];

				mangaDtos[i].newestChapter = chapter[0];
			}

			return mangaDtos.sort((a, b) => {
				if (a.views === undefined || b.views === undefined) {
					return -1;
				}

				return b.views - a.views;
			});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Get top most bookmarked mangas in a period of time
	 * @param top Top first mangas
	 * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
	 */
	getTopMostFollowAsync: async (top: number, period: string = "all") => {
		interface IMangaBookmark {
			_id?: string;
			bookmarks?: number;
		}
		try {
			let aggregationStatements: any[] = [
				{
					$group: {
						_id: "$manga",
						bookmarks: {
							$sum: 1,
						},
					},
				},
				{
					$sort: {
						bookmarks: -1,
					},
				},
				{
					$limit: top,
				},
			];

			let mangaBookmarks: IMangaBookmark[] = [];
			let mangaDtos: BriefMangaDto[] = [];

			if (period === "weekly") {
				let weeklyFilter = getWeeklyFilter();
				aggregationStatements = [weeklyFilter, ...aggregationStatements];
			} else if (period === "monthly") {
				let monthlyFilter = getMonthlyFilter();
				aggregationStatements = [monthlyFilter, ...aggregationStatements];
			} else {
				// Have nothing to do here :))
			}

			// Find them in Manga table
			mangaBookmarks = await BookmarkModel.aggregate(
				aggregationStatements
			).exec();

			mangaDtos = (
				await MangaModel.find()
					.where("id")
					.in(mangaBookmarks.map((v) => v._id))
					.lean()
					.exec()
			).map((manga) => {
				return manga as BriefMangaDto;
			});

			// Set numer for bookmark, views, rating
			for (let i = 0; i < mangaDtos.length; i++) {
				let mangaBookmark = mangaBookmarks.find(
					(bookmark) => bookmark._id === mangaDtos[i].id
				);
				mangaDtos[i].bookmarks = mangaBookmark?.bookmarks;

				mangaDtos[i].views = await ViewModel.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				let mangaRate = await getMangaRating(mangaDtos[i].id);
				mangaDtos[i].averageRate = mangaRate.sum / mangaRate.numRate;

				mangaDtos[i].newestChapter = (
					await ChapterModel.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as ChapterDto;
			}

			return mangaDtos.sort((a, b) => {
				if (a.bookmarks === undefined || b.bookmarks === undefined) {
					return -1;
				}

				return b.bookmarks - a.bookmarks;
			});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Get top most rating mangas in a period of time
	 * @param top Top first mangas
	 * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
	 */
	getTopMostRatingAsync: async (top: number, period: string = "all") => {
		try {
			// Filtering out the most rate mangas
			let aggregationStatements: any[] = [
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
					$project: {
						_id: "$_id",
						numRate: "$numRate",
						sum: "$sum",
						average: {
							$divide: ["$sum", "$numRate"],
						},
					},
				},
				{
					$sort: {
						average: -1,
					},
				},
				{
					$limit: top,
				},
			];

			let mangaRates: IMangaRate[] = [];
			let mangaDtos: BriefMangaDto[] = [];

			if (period === "weekly") {
				let weeklyFilter = getWeeklyFilter();
				aggregationStatements = [weeklyFilter, ...aggregationStatements];
			} else if (period === "monthly") {
				let monthlyFilter = getMonthlyFilter();
				aggregationStatements = [monthlyFilter, ...aggregationStatements];
			} else {
				// Have nothing to do here :))
			}

			mangaRates = await RateModel.aggregate(aggregationStatements).exec();

			mangaDtos = (
				await MangaModel.find()
					.where("id")
					.in(mangaRates.map((v) => v._id))
					.lean()
					.exec()
			).map((manga) => {
				return manga as BriefMangaDto;
			});

			for (let i = 0; i < mangaDtos.length; i++) {
				let mangaRate = mangaRates.find((item) => item._id === mangaDtos[i].id);
				mangaDtos[i].averageRate = mangaRate?.average;

				mangaDtos[i].views = await ViewModel.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				mangaDtos[i].bookmarks = await BookmarkModel.find({
					manga: mangaDtos[i].id,
				})
					.countDocuments()
					.exec();

				mangaDtos[i].newestChapter = (
					await ChapterModel.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as ChapterDto;
			}

			return mangaDtos.sort((a, b) => {
				if (a.averageRate === undefined || b.averageRate === undefined) {
					// console.log(undefined);
					return -1;
				}

				return b.averageRate - a.averageRate;
			});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Get recently uploaded mangas
	 * @param top Top first mangas
	 */
	getRecentlyUploadedAsync: async (top: number) => {
		interface IRecentUploaded {
			_id: string; //manga id
			newestChapter: ChapterDto;
		}

		try {
			let aggregationStatements: any[] = [
				{
					$sort: {
						manga: 1,
						updatedAt: 1,
					},
				},
				{
					$group: {
						_id: "$manga",
						date: {
							$last: "$$ROOT.updatedAt",
						},
						newestChapter: {
							$last: "$$ROOT",
						},
					},
				},
				{
					$sort: {
						date: -1,
					},
				},
				{
					$limit: top,
				},
			];

			// Get newest chapters
			let recentUploadChapters: IRecentUploaded[] = await ChapterModel.aggregate(
				aggregationStatements
			).exec();

			// Find its manga
			let mangaDtos: BriefMangaDto[] = (
				await MangaModel.find()
					.where("id")
					.in(recentUploadChapters.map((v) => v._id))
					.lean()
					.exec()
			).map((item) => item as BriefMangaDto);

			// Fill the rest infomation
			for (let i = 0; i < mangaDtos.length; i++) {
				let recentUploadChapter = recentUploadChapters.find(
					(item) => item._id == mangaDtos[i].id
				);
				mangaDtos[i].newestChapter = recentUploadChapter?.newestChapter;

				mangaDtos[i].averageRate = (
					await getMangaRating(mangaDtos[i].id)
				).average;

				mangaDtos[i].views = await ViewModel.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				mangaDtos[i].bookmarks = await BookmarkModel.find({
					manga: mangaDtos[i].id,
				})
					.countDocuments()
					.exec();
			}

			return mangaDtos.sort((a, b) => {
				if (
					b.newestChapter?.createdAt === undefined ||
					a.newestChapter?.createdAt === undefined
				) {
					return -1;
				}
				return (
					b.newestChapter.createdAt.getSeconds() -
					a.newestChapter.createdAt?.getSeconds()
				);
			});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Get newly added mangas
	 * @param top Top first mangas
	 */
	getNewlyAddedAsync: async (top: number) => {
		try {
			let aggregationStatements: any[] = [
				{
					$sort: {
						createdAt: -1,
					},
				},
				{
					$limit: top,
				},
			];

			let mangaDtos: BriefMangaDto[] = await MangaModel.aggregate(
				aggregationStatements
			).exec();

			for (let i = 0; i < mangaDtos.length; i++) {
				mangaDtos[i].newestChapter = (
					await ChapterModel.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as ChapterDto;

				mangaDtos[i].averageRate = (
					await getMangaRating(mangaDtos[i].id)
				).average;

				mangaDtos[i].views = await ViewModel.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				mangaDtos[i].bookmarks = await BookmarkModel.find({
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

	let mangaRate: IMangaRate = (await RateModel.aggregate(rateAgg).exec())[0];
	mangaRate.average = mangaRate.sum / mangaRate.numRate;
	return mangaRate;
}

function getWeeklyFilter() {
	let today = new Date();
	today.setHours(0, 0, 1);

	let firstDateOfWeek =
		today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
	let lastDateOfWeek = firstDateOfWeek + 6;

	return {
		$match: {
			updatedAt: {
				$gte: new Date(today.getFullYear(), today.getMonth(), firstDateOfWeek),
				$lt: new Date(today.getFullYear(), today.getMonth(), lastDateOfWeek),
			},
		},
	};
}

function getMonthlyFilter() {
	let thisMonth = new Date();
	thisMonth.setHours(0, 0, 1);

	return {
		$match: {
			updatedAt: {
				// First day of this month
				$gte: new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1),
			},
		},
	};
}
