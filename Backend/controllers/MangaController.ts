import {
	bookmarkModel,
	BriefMangaDto,
	ChapterDto,
	chapterModel,
	CommentDto,
	userCommentModel,
	CompletedMangaDto,
	mangaChapterViewModel,
	mangaModel,
	mangaRateModel,
	mangaTagModel,
	mangaCreatorModel,
	creatorModel,
	MangaCreator,
	MangaTagDto,
	chapterDtoOf,
	briefChapterDtoOf,
} from "../models";
import { MangaCreatorDto } from "../models/MangaCreator";

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
			mangaViewDocs = await mangaChapterViewModel
				.aggregate(aggregationStatements)
				.exec();

			// Find them in Manga table
			mangaDtos = (
				await mangaModel
					.find()
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
				mangaDtos[i].bookmarks = await bookmarkModel
					.find({
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
				let chapterData = ((
					await chapterModel.find().sort({ index: -1 }).limit(1).exec()
				)[0] as unknown) as any;

				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);
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
			mangaBookmarks = await bookmarkModel
				.aggregate(aggregationStatements)
				.exec();

			mangaDtos = (
				await mangaModel
					.find()
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

				mangaDtos[i].views = await mangaChapterViewModel
					.find({ manga: mangaDtos[i].id })
					.countDocuments()
					.exec();

				let mangaRate = await getMangaRating(mangaDtos[i].id);
				mangaDtos[i].averageRate = mangaRate.sum / mangaRate.numRate;

				const chapterData = (
					await chapterModel
						.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as any;

				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);
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

			mangaRates = await mangaRateModel.aggregate(aggregationStatements).exec();

			mangaDtos = (
				await mangaModel
					.find()
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

				const chapterData = (
					await chapterModel
						.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as any;

				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);
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
			let recentUploadChapters: IRecentUploaded[] = await chapterModel
				.aggregate(aggregationStatements)
				.exec();

			// Find its manga
			let mangaDtos: BriefMangaDto[] = (
				await mangaModel
					.find()
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

				const chapterData: any = recentUploadChapter?.newestChapter;
				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);

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
				if (
					b.briefChapterDto?.createdAt === undefined ||
					a.briefChapterDto?.createdAt === undefined
				) {
					return -1;
				}
				return (
					b.briefChapterDto.createdAt.getSeconds() -
					a.briefChapterDto.createdAt?.getSeconds()
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

			let mangaDtos: BriefMangaDto[] = await mangaModel
				.aggregate(aggregationStatements)
				.exec();

			for (let i = 0; i < mangaDtos.length; i++) {
				const chapterData = ((
					await chapterModel
						.find({ manga: mangaDtos[i].id })
						.sort({ index: -1 })
						.limit(1)
				)[0] as unknown) as any;

				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);

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

	getAllRecentlyUploaded: async () => {
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
			];

			// Get newest chapters
			let recentUploadChapters: IRecentUploaded[] = await chapterModel
				.aggregate(aggregationStatements)
				.exec();

			// Find its manga
			let mangaDtos: BriefMangaDto[] = (
				await mangaModel
					.find()
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

				const chapterData: any = recentUploadChapter?.newestChapter;
				chapterData.mangaNames = mangaDtos[i].names;

				mangaDtos[i].briefChapterDto = briefChapterDtoOf(chapterData);

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
				if (
					b.briefChapterDto?.createdAt === undefined ||
					a.briefChapterDto?.createdAt === undefined
				) {
					return -1;
				}
				return (
					b.briefChapterDto.createdAt.getSeconds() -
					a.briefChapterDto.createdAt?.getSeconds()
				);
			});
		} catch (error) {
			console.error(error);
		}
	},

	/**
	 * Get one manga and all related data including views, bookmarks, comment
	 * @param id Manga id
	 * @returns CompletedangaDto or undefined if fount nothing
	 */
	getMangaAsync: async (id: string): Promise<CompletedMangaDto | undefined> => {
		try {
			let mangaAgg = [
				{
					$match: {
						id: id,
					},
				},
				{
					$limit: 1,
				},
			];

			let mangaDto: CompletedMangaDto = (
				await mangaModel.aggregate(mangaAgg).exec()
			)[0];

			let mangaRate = await getMangaRating(id);
			mangaDto.averageRate = mangaRate.average;

			mangaDto.bookmarks = await bookmarkModel
				.find({ manga: id })
				.countDocuments()
				.exec();

			mangaDto.views = await mangaChapterViewModel
				.find({ manga: id })
				.countDocuments()
				.exec();

			// Get chapters belong to this manga and sort them from newest to oldest
			let chapterAggregation = [
				{
					$match: {
						manga: id,
					},
				},
				{
					$sort: {
						index: -1,
					},
				},
			];
			let chapters: ChapterDto[] = await chapterModel
				.aggregate(chapterAggregation)
				.exec();
			mangaDto.chapters = chapters;

			// Get comments belong to this manga
			let commentAgg = [
				{
					$match: {
						manga: id,
					},
				},
				{
					$sort: {
						createdAt: -1,
					},
				},
			];
			let comments: CommentDto[] = await userCommentModel
				.aggregate(commentAgg)
				.exec();
			mangaDto.comments = comments;

			return mangaDto;
		} catch (e) {
			console.error(e);
		}
	},

	getAllAuthor: async (author: string) => {
		try {
			let mangaCreatorAgg = [
				{
					$match: {
						creator: {
							$regex: `'.*${author}.*'`,
						},
					},
				},
			];

			let creators: MangaCreatorDto[] = await mangaCreatorModel
				.aggregate(mangaCreatorAgg)
				.exec()[0];

			return creators;
		} catch (e) {
			console.error(e);
		}
	},

	getMangasForCate: async (
		tags: string[],
		title: string,
		undoneName: string,
		period: string = "all",
		sort: string,
		order: string
	) => {
		if (tags === undefined) {
			tags = [];
			tags.push("");
		}

		if (title === undefined) title = "";

		if (undoneName === undefined) title = "";

		try {
			let mangaCreatorAgg = [
				{
					$match: {
						creator: {
							$regex: `.*${undoneName}.*`,
						},
					},
				},
			];

			let creator: MangaCreatorDto[] = await mangaCreatorModel
				.aggregate(mangaCreatorAgg)
				.exec()[0];

			let getTags: MangaTagDto[] = await mangaTagModel
				.aggregate([
					{
						$match: {},
					},
				])
				.exec();

			for (let i = 0; i < tags.length; i++) {
				let mangaTagsAgg = [
					{
						$match: {
							tag: `.*${tags[i]}.*`,
						},
					},
				];

				let tempTagsList: MangaTagDto[] = await mangaTagModel
					.aggregate(mangaTagsAgg)
					.exec();

				let anotherTempList: MangaTagDto[] = [];
				for (let each1 of getTags) {
					for (let each2 of tempTagsList) {
						if (each1.manga === each2.manga) {
							anotherTempList.push(each1);
							break;
						}
					}
				}

				getTags = [];
				anotherTempList.forEach((element) => {
					getTags.push(element);
				});
			}

			let listMangaNeed: string[] = [];
			for (let each1 of creator) {
				for (let each2 of getTags) {
					if (each1.manga === each2.manga) {
						listMangaNeed.push(each1.manga);
						break;
					}
				}
			}

			let mangaDtos: BriefMangaDto[] = [];

			let i = 0;

			for (let each of listMangaNeed) {
				let aggregationStatements: any[] = [
					{
						$sort: {
							updatedAt: -1,
						},
					},
					{
						$match: {
							id: each,
						},
					},
					{
						$match: {
							$regex: `.*${title}.*`,
						},
					},
				];

				if (period === "weekly") {
					let weeklyFilter = getWeeklyFilter();
					aggregationStatements = [weeklyFilter, ...aggregationStatements];
				} else if (period === "monthly") {
					let monthlyFilter = getMonthlyFilter();
					aggregationStatements = [monthlyFilter, ...aggregationStatements];
				}

				mangaDtos[i] = await mangaModel.aggregate(aggregationStatements).exec();
				i++;
			}

			for (let i = 0; i < mangaDtos.length; i++) {
				mangaDtos[i].briefChapterDto = ((
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

			if (sort === "View") {
				if (order === "Descending") {
					mangaDtos.sort((a, b) => {
						if (b.views === undefined || a.views === undefined) {
							return -1;
						}
						return b.views - a.views;
					});
				} else if (order === "Ascending") {
					mangaDtos.sort((a, b) => {
						if (b.views === undefined || a.views === undefined) {
							return -1;
						}
						return a.views - b.views;
					});
				}
			} else if (sort === "Followed") {
				if (order === "Descending") {
					mangaDtos.sort((a, b) => {
						if (b.bookmarks === undefined || a.bookmarks === undefined) {
							return -1;
						}
						return b.bookmarks - a.bookmarks;
					});
				} else if (order === "Ascending") {
					mangaDtos.sort((a, b) => {
						if (b.bookmarks === undefined || a.bookmarks === undefined) {
							return -1;
						}
						return a.bookmarks - b.bookmarks;
					});
				}
			} else if (sort === "Rate") {
				if (order === "Descending") {
					mangaDtos.sort((a, b) => {
						if (b.averageRate === undefined || a.averageRate === undefined) {
							return -1;
						}
						return b.averageRate - a.averageRate;
					});
				} else if (order === "Ascending") {
					mangaDtos.sort((a, b) => {
						if (b.averageRate === undefined || a.averageRate === undefined) {
							return -1;
						}
						return a.averageRate - b.averageRate;
					});
				}
			} else if (sort === "Name") {
				if (order === "Descending") {
					mangaDtos.sort((a, b) => (a.names < b.names ? 1 : -1));
				} else if (order === "Ascending") {
					mangaDtos.sort((a, b) => (a.names > b.names ? 1 : -1));
				}
			} else if (sort === "Date") {
				if (order === "Descending") {
					mangaDtos.sort((a, b) => {
						if (b.updatedAt === undefined || a.updatedAt === undefined) {
							return -1;
						}
						return b.updatedAt.getSeconds() - a.updatedAt.getSeconds();
					});
				} else if (order === "Ascending") {
					mangaDtos.sort((a, b) => {
						if (b.createdAt === undefined || a.createdAt === undefined) {
							return -1;
						}
						return -b.createdAt.getSeconds() + a.createdAt.getSeconds();
					});
				}
			}

			return mangaDtos;
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

// async function getAuthor(words:string) {
// 	const nameAgg = [{
// 		$match:{
// 			name: {
// 				$regex: `.*${words}.*`
// 			}
// 		}
// 	}];

// 	let authors = (await CreatorModel.aggregate(nameAgg).exec())[0];
// 	return authors[0];
// }

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
