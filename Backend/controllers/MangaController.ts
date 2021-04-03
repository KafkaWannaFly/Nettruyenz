import { ChapterDto } from "../DTOs/ChapterDto";
import { BriefMangaDto } from "../DTOs/MangaDto";
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
					.exec()) as ChapterDto;

				mangaDtos[i].newestChapter = chapter;
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
	 * @param top op first mangas
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