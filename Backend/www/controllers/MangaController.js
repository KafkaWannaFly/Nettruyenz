"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaController = void 0;
const models_1 = require("../models");
exports.MangaController = {
    /**
     * Get top most view mangas in a period of time
     * @param top Top first mangas
     * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
     */
    getTopMostViewAsync: async (top, period = "all") => {
        try {
            let aggregationStatements = [
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
            let mangaViewDocs = [];
            let mangaDtos = [];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements = [weeklyFilter, ...aggregationStatements];
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements = [monthlyFilter, ...aggregationStatements];
            }
            else {
                // Have nothing to do here :))
            }
            // Most view mangas
            mangaViewDocs = await models_1.mangaChapterViewModel
                .aggregate(aggregationStatements)
                .exec();
            // Find them in Manga table
            mangaDtos = (await models_1.mangaModel
                .find()
                .where("id")
                .in(mangaViewDocs.map((v) => v._id))
                .lean()
                .exec()).map((manga, index) => {
                let dto = manga;
                return dto;
            });
            // Set properties: views, bookmakrs and rate
            for (let i = 0; i < mangaDtos.length; i++) {
                let mangaView = mangaViewDocs.find((item) => item._id === mangaDtos[i].id);
                // console.log(mangaView);
                mangaDtos[i].views = mangaView?.views;
                mangaDtos[i].bookmarks = await models_1.bookmarkModel
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
                let chapter = (await models_1.chapterModel
                    .find()
                    .sort({ index: -1 })
                    .limit(1)
                    .exec());
                mangaDtos[i].newestChapter = chapter[0];
            }
            return mangaDtos.sort((a, b) => {
                if (a.views === undefined || b.views === undefined) {
                    return -1;
                }
                return b.views - a.views;
            });
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Get top most bookmarked mangas in a period of time
     * @param top Top first mangas
     * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
     */
    getTopMostFollowAsync: async (top, period = "all") => {
        try {
            let aggregationStatements = [
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
            let mangaBookmarks = [];
            let mangaDtos = [];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements = [weeklyFilter, ...aggregationStatements];
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements = [monthlyFilter, ...aggregationStatements];
            }
            else {
                // Have nothing to do here :))
            }
            // Find them in Manga table
            mangaBookmarks = await models_1.bookmarkModel
                .aggregate(aggregationStatements)
                .exec();
            mangaDtos = (await models_1.mangaModel
                .find()
                .where("id")
                .in(mangaBookmarks.map((v) => v._id))
                .lean()
                .exec()).map((manga) => {
                return manga;
            });
            // Set numer for bookmark, views, rating
            for (let i = 0; i < mangaDtos.length; i++) {
                let mangaBookmark = mangaBookmarks.find((bookmark) => bookmark._id === mangaDtos[i].id);
                mangaDtos[i].bookmarks = mangaBookmark?.bookmarks;
                mangaDtos[i].views = await models_1.mangaChapterViewModel
                    .find({ manga: mangaDtos[i].id })
                    .countDocuments()
                    .exec();
                let mangaRate = await getMangaRating(mangaDtos[i].id);
                mangaDtos[i].averageRate = mangaRate.sum / mangaRate.numRate;
                mangaDtos[i].newestChapter = (await models_1.chapterModel
                    .find({ manga: mangaDtos[i].id })
                    .sort({ index: -1 })
                    .limit(1))[0];
            }
            return mangaDtos.sort((a, b) => {
                if (a.bookmarks === undefined || b.bookmarks === undefined) {
                    return -1;
                }
                return b.bookmarks - a.bookmarks;
            });
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Get top most rating mangas in a period of time
     * @param top Top first mangas
     * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
     */
    getTopMostRatingAsync: async (top, period = "all") => {
        try {
            // Filtering out the most rate mangas
            let aggregationStatements = [
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
            let mangaRates = [];
            let mangaDtos = [];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements = [weeklyFilter, ...aggregationStatements];
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements = [monthlyFilter, ...aggregationStatements];
            }
            else {
                // Have nothing to do here :))
            }
            mangaRates = await models_1.mangaRateModel.aggregate(aggregationStatements).exec();
            mangaDtos = (await models_1.mangaModel
                .find()
                .where("id")
                .in(mangaRates.map((v) => v._id))
                .lean()
                .exec()).map((manga) => {
                return manga;
            });
            for (let i = 0; i < mangaDtos.length; i++) {
                let mangaRate = mangaRates.find((item) => item._id === mangaDtos[i].id);
                mangaDtos[i].averageRate = mangaRate?.average;
                mangaDtos[i].views = await models_1.mangaChapterViewModel
                    .find({ manga: mangaDtos[i].id })
                    .countDocuments()
                    .exec();
                mangaDtos[i].bookmarks = await models_1.bookmarkModel
                    .find({
                    manga: mangaDtos[i].id,
                })
                    .countDocuments()
                    .exec();
                mangaDtos[i].newestChapter = (await models_1.chapterModel
                    .find({ manga: mangaDtos[i].id })
                    .sort({ index: -1 })
                    .limit(1))[0];
            }
            return mangaDtos.sort((a, b) => {
                if (a.averageRate === undefined || b.averageRate === undefined) {
                    // console.log(undefined);
                    return -1;
                }
                return b.averageRate - a.averageRate;
            });
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Get recently uploaded mangas
     * @param top Top first mangas
     */
    getRecentlyUploadedAsync: async (top) => {
        try {
            let aggregationStatements = [
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
            let recentUploadChapters = await models_1.chapterModel
                .aggregate(aggregationStatements)
                .exec();
            // Find its manga
            let mangaDtos = (await models_1.mangaModel
                .find()
                .where("id")
                .in(recentUploadChapters.map((v) => v._id))
                .lean()
                .exec()).map((item) => item);
            // Fill the rest infomation
            for (let i = 0; i < mangaDtos.length; i++) {
                let recentUploadChapter = recentUploadChapters.find((item) => item._id == mangaDtos[i].id);
                mangaDtos[i].newestChapter = recentUploadChapter?.newestChapter;
                mangaDtos[i].averageRate = (await getMangaRating(mangaDtos[i].id)).average;
                mangaDtos[i].views = await models_1.mangaChapterViewModel
                    .find({ manga: mangaDtos[i].id })
                    .countDocuments()
                    .exec();
                mangaDtos[i].bookmarks = await models_1.bookmarkModel
                    .find({
                    manga: mangaDtos[i].id,
                })
                    .countDocuments()
                    .exec();
            }
            return mangaDtos.sort((a, b) => {
                if (b.newestChapter?.createdAt === undefined ||
                    a.newestChapter?.createdAt === undefined) {
                    return -1;
                }
                return (b.newestChapter.createdAt.getSeconds() -
                    a.newestChapter.createdAt?.getSeconds());
            });
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Get newly added mangas
     * @param top Top first mangas
     */
    getNewlyAddedAsync: async (top) => {
        try {
            let aggregationStatements = [
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $limit: top,
                },
            ];
            let mangaDtos = await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec();
            for (let i = 0; i < mangaDtos.length; i++) {
                mangaDtos[i].newestChapter = (await models_1.chapterModel
                    .find({ manga: mangaDtos[i].id })
                    .sort({ index: -1 })
                    .limit(1))[0];
                mangaDtos[i].averageRate = (await getMangaRating(mangaDtos[i].id)).average;
                mangaDtos[i].views = await models_1.mangaChapterViewModel
                    .find({ manga: mangaDtos[i].id })
                    .countDocuments()
                    .exec();
                mangaDtos[i].bookmarks = await models_1.bookmarkModel
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
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Get one manga and all related data including views, bookmarks, comment
     * @param id Manga id
     * @returns CompletedangaDto or undefined if fount nothing
     */
    getMangaAsync: async (id) => {
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
            let mangaDto = (await models_1.mangaModel.aggregate(mangaAgg).exec())[0];
            // let manga = ((await MangaModel.findOne({
            // 	id: id,
            // }).exec()) as unknown) as Manga;
            // let mangaDto: CompletedMangaDto = manga;
            let mangaRate = await getMangaRating(id);
            mangaDto.averageRate = mangaRate.average;
            mangaDto.bookmarks = await models_1.bookmarkModel
                .find({ manga: id })
                .countDocuments()
                .exec();
            mangaDto.views = await models_1.mangaChapterViewModel
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
            let chapters = await models_1.chapterModel
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
            let comments = await models_1.userCommentModel
                .aggregate(commentAgg)
                .exec();
            mangaDto.comments = comments;
            return mangaDto;
        }
        catch (e) {
            console.error(e);
        }
    },
    getMangaTags: async () => {
        const tagAgg = [
            {
                $match: {}
            }
        ];
        let mangaTags = await (models_1.tagModel.aggregate(tagAgg).exec())[0];
        return mangaTags;
    },
    getMangasForCate: async (top, period = "all", _tags, undoneName) => {
        try {
            // Find tag
            // let listAuthors = getAuthor(undoneName);
            let aggregationStatements = [
                {
                    $project: {
                        _id: "$id"
                    },
                },
                {
                    $match: {}
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
            let mangaDtos = [];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements = [weeklyFilter, ...aggregationStatements];
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements = [monthlyFilter, ...aggregationStatements];
            }
            else {
                // Have nothing to do here :))
            }
            let mangasByTag = [];
            mangasByTag = await models_1.tagModel.aggregate(aggregationStatements).exec();
            mangaDtos = (await models_1.mangaModel.find()
                .where("id")
                .in(mangasByTag.map((v) => v._id))
                .lean()
                .exec()).map((manga) => {
                return manga;
            });
            return mangaDtos.sort((a, b) => {
                if (b.newestChapter?.createdAt === undefined ||
                    a.newestChapter?.createdAt === undefined) {
                    return -1;
                }
                return (b.newestChapter.createdAt.getSeconds() -
                    a.newestChapter.createdAt?.getSeconds());
            });
        }
        catch (error) {
            console.error(error);
        }
    },
};
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
async function getMangaRating(id) {
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
    let mangaRate = (await models_1.mangaRateModel.aggregate(rateAgg).exec())[0];
    mangaRate.average = mangaRate.sum / mangaRate.numRate;
    return mangaRate;
}
function getWeeklyFilter() {
    let today = new Date();
    today.setHours(0, 0, 1);
    let firstDateOfWeek = today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
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
