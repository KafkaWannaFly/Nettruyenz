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
    changeUserPasswordAsync: async (email, newPassword) => {
        const user = (await exports.userController.getUserAsync(email));
        user.password = await bcrypt_1.default.hash(newPassword, EnvironmentConstants_1.SALT);
        await models_1.userModel.updateOne({ email: email }, user).exec();
        return user;
    },
    getUserBookmarks: async (email) => {
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
                $lookup: {
                    from: "manga-creators",
                    localField: "manga",
                    foreignField: "manga",
                    as: "mangaCreatorDocs",
                },
            },
            {
                $set: {
                    "briefMangaDto.creators": "$mangaCreatorDocs.creator",
                },
            },
            {
                $unset: [
                    "chapterDocs",
                    "viewDocs",
                    "mangaRateDocs",
                    "bookmarkDocs",
                    "chapterViewDocs",
                    "mangaCreatorDocs",
                ],
            },
        ];
        const data = await models_1.bookmarkModel.aggregate(agg).exec();
        let bookmarksDto = [];
        if (data.length > 0) {
            bookmarksDto = data.map((item) => models_1.bookmarkDtoOf(item));
        }
        return bookmarksDto;
    },
    getUserRatesMade: async (email) => {
        const agg = [
            {
                $match: {
                    email: email,
                    isDeleted: false,
                },
            },
        ];
        let ratesMade = [];
        let data = await models_1.mangaRateModel.aggregate(agg).exec();
        if (data.length > 0) {
            ratesMade = data.map((item) => models_1.mangaRateDtoOf(item));
        }
        return ratesMade;
    },
    getUserViewedChapters: async (email) => {
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
        let mangaChapterViews = [];
        const data = await models_1.mangaChapterViewModel.aggregate(agg).exec();
        if (data.length > 0) {
            mangaChapterViews = data.map((item) => models_1.mangaChapterViewDtoOf(item));
        }
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
                mangaDtos[i].briefChapterDto = (await models_1.chapterModel
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
