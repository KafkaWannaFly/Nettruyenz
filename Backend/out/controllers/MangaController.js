"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaController = void 0;
const BookmarkModel_1 = require("../models/BookmarkModel");
const ChapterModel_1 = require("../models/ChapterModel");
const MangaModel_1 = require("../models/MangaModel");
const RateModel_1 = require("../models/RateModel");
const ViewModel_1 = require("../models/ViewModel");
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
            mangaViewDocs = await ViewModel_1.ViewModel.aggregate(aggregationStatements).exec();
            // Find them in Manga table
            mangaDtos = (await MangaModel_1.MangaModel.find()
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
                mangaDtos[i].bookmarks = await BookmarkModel_1.BookmarkModel.find({
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
                let chapter = (await ChapterModel_1.ChapterModel.find()
                    .sort({ index: -1 })
                    .limit(1)
                    .exec());
                mangaDtos[i].newestChapter = chapter;
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
     * @param top op first mangas
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
            mangaBookmarks = await BookmarkModel_1.BookmarkModel.aggregate(aggregationStatements).exec();
            mangaDtos = (await MangaModel_1.MangaModel.find()
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
                mangaDtos[i].views = await ViewModel_1.ViewModel.find({ manga: mangaDtos[i].id })
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
        }
        catch (error) {
            console.error(error);
        }
    },
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
            mangaRates = await RateModel_1.RateModel.aggregate(aggregationStatements).exec();
            mangaDtos = (await MangaModel_1.MangaModel.find()
                .where("id")
                .in(mangaRates.map((v) => v._id))
                .lean()
                .exec()).map((manga) => {
                return manga;
            });
            for (let i = 0; i < mangaDtos.length; i++) {
                let mangaRate = mangaRates.find((item) => item._id === mangaDtos[i].id);
                mangaDtos[i].averageRate = mangaRate?.average;
                mangaDtos[i].views = await ViewModel_1.ViewModel.find({ manga: mangaDtos[i].id })
                    .countDocuments()
                    .exec();
                mangaDtos[i].bookmarks = await BookmarkModel_1.BookmarkModel.find({
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
        }
        catch (error) {
            console.error(error);
        }
    },
};
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
    let mangaRate = (await RateModel_1.RateModel.aggregate(rateAgg).exec())[0];
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
