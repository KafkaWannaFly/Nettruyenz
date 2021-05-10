"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
exports.userController = {
    /**
     * Find user by username
     * @param email Username
     * @returns user object if found. undefined if not
     */
    getUserAsync: async (email) => {
        try {
            let userDoc = await models_1.userModel.findOne({ email: email }).exec();
            return userDoc?.toObject();
        }
        catch (error) {
            console.error(error);
        }
    },
    /**
     * Register a new user
     * @param user User object
     * @returns True if success, false if not. Undefined when exception occurs
     */
    registerUserAsync: async (user) => {
        try {
            let existedUser = await exports.userController.getUserAsync(user.email);
            if (existedUser !== undefined) {
                return false;
            }
            let model = new models_1.userModel(user);
            let registeredDoc = await model.save();
            return true;
        }
        catch (error) {
            console.error(error);
        }
        return false;
    },
    resetUserPasswordAsync: async (email, newPassword) => {
        const user = (await exports.userController.getUserAsync(email));
        user.password = await bcrypt_1.default.hash(newPassword, EnvironmentConstants_1.SALT);
        await models_1.userModel.updateOne({ email: email }, user).exec();
        return user;
    },
    getUserBookmarks: async (email) => {
        const agg = [
            {
                $lookup: {
                    from: "mangas",
                    localField: "manga",
                    foreignField: "id",
                    as: "manga",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ["$manga", 0],
                            },
                            "$$ROOT",
                        ],
                    },
                },
            },
            {
                $project: {
                    manga: 0,
                },
            },
            {
                $lookup: {
                    from: "manga-tags",
                    localField: "id",
                    foreignField: "manga",
                    as: "manga_tags",
                },
            },
            {
                $set: {
                    tags: "$manga_tags.tag",
                },
            },
            {
                $lookup: {
                    from: "manga-creators",
                    localField: "id",
                    foreignField: "manga",
                    as: "manga_creators",
                },
            },
            {
                $set: {
                    creators: "$manga_creators.creator",
                },
            },
        ];
        const bookmarksDto = await models_1.bookmarkModel
            .aggregate(agg)
            .exec();
        return bookmarksDto;
    },
    getUserFollowedList: async (email) => {
        try {
            const mangaDtos = [];
            const agg = [
                {
                    $match: {
                        email: email,
                    },
                },
            ];
            const bookmarks = await models_1.bookmarkModel.aggregate(agg).exec();
            for (let each of bookmarks) {
                let bookmarkAgg = [
                    {
                        $match: {
                            id: each.manga,
                        },
                    },
                ];
                let manga = await models_1.mangaModel
                    .aggregate(bookmarkAgg)
                    .exec()[0];
                mangaDtos.push(manga);
            }
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
    getUserRatesMade: async (email) => {
        const agg = [
            {
                $match: {
                    email: email,
                },
            },
        ];
        const ratesMade = await models_1.mangaRateModel.aggregate(agg).exec();
        return ratesMade;
    },
    getUserViewedChapters: async (email) => {
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
        const mangaChapterViews = await models_1.mangaChapterViewModel
            .aggregate(agg)
            .exec();
        return mangaChapterViews;
    },
    getUserReadingHistory: async (email) => {
        try {
            const mangaDtos = [];
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
            const mangaChapterViews = await models_1.mangaChapterViewModel
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
                let manga = await models_1.mangaModel
                    .aggregate(viewedAgg)
                    .exec()[0];
                mangaDtos.push(manga);
            }
            for (let i = 0; i < mangaDtos.length; i++) {
                mangaDtos[i].newestChapter = (await models_1.chapterModel
                    .find({ manga: mangaDtos[i].id })
                    .sort({ index: -1 })
                    .limit(1))[0];
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
    let mangaRate = (await models_1.mangaRateModel.aggregate(rateAgg).exec())[0];
    mangaRate.average = mangaRate.sum / mangaRate.numRate;
    return mangaRate;
}
