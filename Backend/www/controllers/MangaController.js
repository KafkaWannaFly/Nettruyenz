"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaController = void 0;
const models_1 = require("../models");
exports.mangaController = {
    saveMangaAsync: async (manga) => {
        return await new models_1.mangaModel(manga).save();
    },
    getMangaByIdAsync: async (id) => {
        const mangaDoc = await models_1.mangaModel.findOne({ id: id }).exec();
        return mangaDoc;
    },
    /**
     * Get top most view mangas in a period of time
     * @param top Top first mangas
     * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
     */
    getTopMostViewAsync: async (top, period = "all") => {
        try {
            let aggregationStatements = [
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tags",
                    },
                },
                {
                    $set: {
                        tags: "$tags.tag",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creators",
                    },
                },
                {
                    $set: {
                        creators: "$creators.creator",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "mangaRateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$mangaRateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$mangaRateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$mangaRateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $sort: {
                        views: -1,
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $set: {
                        briefChapterDto: {
                            $last: "$chapterDocs",
                        },
                    },
                },
                {
                    $limit: top,
                },
                {
                    $unset: [
                        "viewDocs",
                        "mangaRateDocs",
                        "chapterDocs",
                        "bookmarkDocs",
                        "briefChapterDto.images",
                    ],
                },
            ];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements.push(weeklyFilter);
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements.push(monthlyFilter);
            }
            else {
                // Have nothing to do here :))
            }
            let data = (await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec());
            if (!data) {
                return [];
            }
            const briefMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
            return briefMangaDtos;
        }
        catch (error) {
            console.error(error);
        }
        return [];
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
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tags",
                    },
                },
                {
                    $set: {
                        tags: "$tags.tag",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creators",
                    },
                },
                {
                    $set: {
                        creators: "$creators.creator",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "mangaRateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$mangaRateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$mangaRateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$mangaRateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $set: {
                        briefChapterDto: {
                            $last: "$chapterDocs",
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
                {
                    $unset: [
                        "viewDocs",
                        "mangaRateDocs",
                        "chapterDocs",
                        "bookmarkDocs",
                        "briefChapterDto.images",
                    ],
                },
            ];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements.push(weeklyFilter);
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements.push(monthlyFilter);
            }
            else {
                // Have nothing to do here :))
            }
            const data = (await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec());
            if (!data) {
                return [];
            }
            const briefMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
            return briefMangaDtos;
        }
        catch (error) {
            console.error(error);
        }
        return [];
    },
    /**
     * Get top most rating mangas in a period of time
     * @param top Top first mangas
     * @param period Accept "weekly" "monthly" or "all". Other values will be considered as "all"
     */
    getTopMostRatingAsync: async (top, period = "all") => {
        try {
            let aggregationStatements = [
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tags",
                    },
                },
                {
                    $set: {
                        tags: "$tags.tag",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creators",
                    },
                },
                {
                    $set: {
                        creators: "$creators.creator",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "mangaRateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$mangaRateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$mangaRateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$mangaRateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $set: {
                        briefChapterDto: {
                            $last: "$chapterDocs",
                        },
                    },
                },
                {
                    $sort: {
                        averageRate: -1,
                    },
                },
                {
                    $limit: top,
                },
                {
                    $unset: [
                        "viewDocs",
                        "mangaRateDocs",
                        "chapterDocs",
                        "bookmarkDocs",
                        "briefChapterDto.images",
                    ],
                },
            ];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements.push(weeklyFilter);
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements.push(monthlyFilter);
            }
            else {
                // Have nothing to do here :))
            }
            let data = (await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec());
            if (!data) {
                return [];
            }
            const briefMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
            return briefMangaDtos;
        }
        catch (error) {
            console.error(error);
        }
        return [];
    },
    /**
     * Get recently uploaded mangas
     * @param top Top first mangas
     */
    getRecentlyUploadedAsync: async (top) => {
        try {
            let aggregationStatements = [
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tags",
                    },
                },
                {
                    $set: {
                        tags: "$tags.tag",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creators",
                    },
                },
                {
                    $set: {
                        creators: "$creators.creator",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "mangaRateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$mangaRateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$mangaRateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$mangaRateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $set: {
                        briefChapterDto: {
                            $last: "$chapterDocs",
                        },
                    },
                },
                {
                    $sort: {
                        updatedAt: -1,
                    },
                },
                {
                    $limit: top,
                },
                {
                    $unset: [
                        "viewDocs",
                        "mangaRateDocs",
                        "chapterDocs",
                        "bookmarkDocs",
                        "briefChapterDto.images",
                    ],
                },
            ];
            let data = (await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec());
            if (!data) {
                return [];
            }
            const briefMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
            return briefMangaDtos;
        }
        catch (error) {
            console.error(error);
        }
        return [];
    },
    /**
     * Get newly added mangas
     * @param top Top first mangas
     */
    getNewlyAddedAsync: async (top) => {
        try {
            let aggregationStatements = [
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tags",
                    },
                },
                {
                    $set: {
                        tags: "$tags.tag",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creators",
                    },
                },
                {
                    $set: {
                        creators: "$creators.creator",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "mangaRateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$mangaRateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$mangaRateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$mangaRateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $set: {
                        briefChapterDto: {
                            $last: "$chapterDocs",
                        },
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $limit: top,
                },
                {
                    $unset: [
                        "viewDocs",
                        "mangaRateDocs",
                        "chapterDocs",
                        "bookmarkDocs",
                        "briefChapterDto.images",
                    ],
                },
            ];
            let data = (await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec());
            if (!data) {
                return [];
            }
            const briefMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
            return briefMangaDtos;
        }
        catch (error) {
            console.error(error);
        }
        return [];
    },
    getAllRecentlyUploaded: async () => {
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
            ];
            // Get newest chapters
            let recentUploadChapters = await models_1.chapterModel
                .aggregate(aggregationStatements)
                .exec();
            recentUploadChapters.forEach((element) => {
                console.log(element._id);
                console.log(element.newestChapter.createdAt);
            });
            // Find its manga
            let mangaDtos = (await models_1.mangaModel
                .find()
                .where("id")
                .in(recentUploadChapters.map((v) => v._id))
                .lean()
                .exec()).map((item) => item);
            console.log("---------------");
            mangaDtos.forEach((element) => {
                console.log(element.id);
            });
            // Fill the rest infomation
            for (let i = 0; i < mangaDtos.length; i++) {
                let recentUploadChapter = recentUploadChapters.find((item) => item._id == mangaDtos[i].id);
                const chapterData = recentUploadChapter?.newestChapter;
                chapterData.mangaNames = mangaDtos[i].names;
                mangaDtos[i].briefChapterDto = models_1.briefChapterDtoOf(chapterData);
                const agg = [
                    {
                        $match: {
                            id: mangaDtos[i].id,
                        },
                    },
                    {
                        $lookup: {
                            from: "bookmarks",
                            localField: "id",
                            foreignField: "manga",
                            as: "bookmarkDocs",
                        },
                    },
                    {
                        $set: {
                            bookmarks: {
                                $size: "$bookmarkDocs",
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "views",
                            localField: "id",
                            foreignField: "manga",
                            as: "viewDocs",
                        },
                    },
                    {
                        $set: {
                            views: {
                                $size: "$viewDocs",
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "manga-rates",
                            localField: "id",
                            foreignField: "manga",
                            as: "rateDocs",
                        },
                    },
                    {
                        $set: {
                            averageRate: {
                                $divide: [
                                    {
                                        $sum: "$rateDocs.rate",
                                    },
                                    {
                                        $cond: [
                                            {
                                                $eq: [
                                                    {
                                                        $size: "$rateDocs",
                                                    },
                                                    0,
                                                ],
                                            },
                                            1,
                                            {
                                                $size: "$rateDocs",
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "chapters",
                            localField: "id",
                            foreignField: "manga",
                            as: "chapterDocs",
                        },
                    },
                    {
                        $set: {
                            briefChapterDto: {
                                $last: "$chapterDocs",
                            },
                        },
                    },
                    {
                        $unset: ["viewDocs", "rateDocs", "bookmarkDocs", "chapterDocs"],
                    },
                ];
                let data = await models_1.mangaModel.aggregate(agg).exec();
                console.log(data);
                if (!data) {
                    return [];
                }
                let tempMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
                mangaDtos[i].averageRate = tempMangaDtos.averageRate;
                mangaDtos[i].views = tempMangaDtos.views;
                mangaDtos[i].bookmarks = tempMangaDtos.bookmarks;
            }
            mangaDtos.sort((a, b) => {
                if (b.briefChapterDto?.createdAt === undefined ||
                    a.briefChapterDto?.createdAt === undefined) {
                    return -1;
                }
                return (b.briefChapterDto.createdAt.getTime() -
                    a.briefChapterDto.createdAt?.getTime());
            });
            console.log("---------------");
            mangaDtos.forEach((element) => {
                console.log(element.briefChapterDto?.createdAt?.getTime());
                console.log(element.id);
            });
            return mangaDtos;
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
    getCompletedMangaDtoByIdAsync: async (id) => {
        try {
            const agg = [
                {
                    $match: {
                        id: id,
                    },
                },
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "chapterDocs.id",
                        foreignField: "chapter",
                        as: "viewChapterDocs",
                    },
                },
                {
                    $lookup: {
                        from: "bookmarks",
                        localField: "id",
                        foreignField: "manga",
                        as: "bookmarkDocs",
                    },
                },
                {
                    $set: {
                        bookmarks: {
                            $size: "$bookmarkDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "views",
                        localField: "id",
                        foreignField: "manga",
                        as: "viewDocs",
                    },
                },
                {
                    $set: {
                        views: {
                            $size: "$viewDocs",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "manga-rates",
                        localField: "id",
                        foreignField: "manga",
                        as: "rateDocs",
                    },
                },
                {
                    $set: {
                        averageRate: {
                            $divide: [
                                {
                                    $sum: "$rateDocs.rate",
                                },
                                {
                                    $cond: [
                                        {
                                            $eq: [
                                                {
                                                    $size: "$rateDocs",
                                                },
                                                0,
                                            ],
                                        },
                                        1,
                                        {
                                            $size: "$rateDocs",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "user-comments",
                        localField: "id",
                        foreignField: "manga",
                        as: "commentDocs",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creatorDocs",
                    },
                },
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tagDocs",
                    },
                },
                {
                    $unset: ["viewDocs", "rateDocs", "bookmarkDocs", "viewChapterDocs"],
                },
            ];
            const data = await models_1.mangaModel.aggregate(agg).exec();
            if (!data) {
                return undefined;
            }
            const completedangaDto = models_1.completeMangaDtoOf(data[0]);
            for (let i = 0; i < completedangaDto.briefChapterDtos.length; i++) {
                const views = await models_1.mangaChapterViewModel
                    .find({ chapter: completedangaDto.briefChapterDtos[i].id })
                    .countDocuments()
                    .exec();
                completedangaDto.briefChapterDtos[i].views = views;
            }
            return completedangaDto;
        }
        catch (e) {
            console.error(e);
        }
    },
    getAllCompletedMangaDtoAsync: async () => {
        try {
            const agg = [
                {
                    $lookup: {
                        from: "chapters",
                        localField: "id",
                        foreignField: "manga",
                        as: "chapterDocs",
                    },
                },
                {
                    $lookup: {
                        from: "manga-creators",
                        localField: "id",
                        foreignField: "manga",
                        as: "creatorDocs",
                    },
                },
                {
                    $lookup: {
                        from: "manga-tags",
                        localField: "id",
                        foreignField: "manga",
                        as: "tagDocs",
                    },
                },
                {
                    $unset: [
                        "viewDocs",
                        "rateDocs",
                        "bookmarkDocs",
                        "viewChapterDocs",
                        "chapterDocs.images",
                        "chapterDocs.description",
                    ],
                },
            ];
            const data = await models_1.mangaModel.aggregate(agg).exec();
            if (!data) {
                return [];
            }
            const completedangaDto = data.map((item) => models_1.completeMangaDtoOf(item));
            return completedangaDto;
        }
        catch (e) {
            console.error(e);
        }
        return [];
    },
    //Test area
    getAllAuthor: async (author) => {
        if (author === undefined)
            author = "";
        try {
            let mangaCreatorAgg = [
                {
                    $match: {
                        creator: {
                            $regex: `.*${author}.*`,
                        },
                    },
                },
            ];
            let creators = await models_1.mangaCreatorModel
                .aggregate(mangaCreatorAgg)
                .exec();
            return creators;
        }
        catch (e) {
            console.error(e);
        }
    },
    getMangaByName: async (name, id, period = "all") => {
        if (name === undefined)
            name = "";
        if (id === undefined)
            id = "";
        try {
            let aggregationStatements = [
                {
                    $sort: {
                        updatedAt: -1,
                    },
                },
                {
                    $match: {
                        names: {
                            $regex: new RegExp("^" + name, "i"),
                        },
                    },
                },
                {
                    $match: {
                        id: {
                            $regex: `.*${id}.*`,
                        },
                    },
                },
            ];
            if (period === "weekly") {
                let weeklyFilter = getWeeklyFilter();
                aggregationStatements = [weeklyFilter, ...aggregationStatements];
            }
            else if (period === "monthly") {
                let monthlyFilter = getMonthlyFilter();
                aggregationStatements = [monthlyFilter, ...aggregationStatements];
            }
            let mangaDtos = await models_1.mangaModel
                .aggregate(aggregationStatements)
                .exec();
            return mangaDtos;
        }
        catch (e) {
            console.error(e);
        }
    },
    getMangaByTag: async (tags) => {
        try {
            let getTags = await models_1.mangaTagModel
                .aggregate([
                {
                    $match: {},
                },
            ])
                .exec();
            if (tags !== undefined) {
                for (let i = 0; i < tags.length; i++) {
                    let mangaTagsAgg = [
                        {
                            $match: {
                                tag: new RegExp("^" + tags[i], "i"),
                            },
                        },
                    ];
                    console.log(tags[i]);
                    let tempTagsList = await models_1.mangaTagModel
                        .aggregate(mangaTagsAgg)
                        .exec();
                    console.log(tempTagsList);
                    let anotherTempList = [];
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
            }
            let mangaTags = [];
            getTags.forEach((element) => {
                mangaTags.push(element.manga);
            });
            let uniqueMangaTag = Array.from(new Set(mangaTags));
            return uniqueMangaTag;
        }
        catch (e) {
            console.error(e);
        }
    },
    getMangaBeforeWeekend: async () => {
        let today = new Date();
        today.setHours(0, 0, 1);
        let firstDateOfWeek = today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
        let lastDateOfWeek = firstDateOfWeek + 6;
        let agg = [
            {
                $match: {
                    id: "1",
                },
            },
        ];
        let mangas = await models_1.mangaModel.aggregate(agg).exec();
        return mangas[0].updatedAt;
    },
    //End of test area
    getMangasForCate: async (tags, title, undoneName, period, sort, order) => {
        if (title === undefined)
            title = "";
        console.log(title);
        if (undoneName === undefined)
            undoneName = "";
        if (sort === undefined)
            sort = "date";
        if (order === undefined)
            order = "desc";
        if (period === undefined)
            period = "all";
        try {
            let mangaCreatorAgg = [
                {
                    $match: {
                        creator: {
                            $regex: new RegExp("^" + undoneName, "i"),
                        },
                    },
                },
            ];
            let creator = await models_1.mangaCreatorModel
                .aggregate(mangaCreatorAgg)
                .exec();
            // console.log(creator);
            let getTags = await models_1.mangaTagModel
                .aggregate([
                {
                    $match: {},
                },
            ])
                .exec();
            if (tags !== undefined) {
                for (let i = 0; i < tags.length; i++) {
                    let mangaTagsAgg = [
                        {
                            $match: {
                                tag: new RegExp("^" + tags[i], "i"),
                            },
                        },
                    ];
                    let tempTagsList = await models_1.mangaTagModel
                        .aggregate(mangaTagsAgg)
                        .exec();
                    let anotherTempList = [];
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
            }
            let mangaTags = [];
            getTags.forEach((element) => {
                mangaTags.push(element.manga);
            });
            let uniqueMangaTag = Array.from(new Set(mangaTags));
            console.log(uniqueMangaTag);
            let listMangaNeed = [];
            for (let each1 of creator) {
                for (let each2 of uniqueMangaTag) {
                    if (each1.manga === each2) {
                        listMangaNeed.push(each1.manga);
                        break;
                    }
                }
            }
            listMangaNeed = Array.from(new Set(listMangaNeed));
            // console.log(listMangaNeed);
            let mangaDtos = [];
            let i = 0;
            for (let each of listMangaNeed) {
                let aggregationStatements = [
                    {
                        $sort: {
                            updatedAt: -1,
                        },
                    },
                    {
                        $match: {
                            id: `${each}`,
                        },
                    },
                    {
                        $match: {
                            names: {
                                $regex: new RegExp("^" + title, "i"),
                            },
                        },
                    },
                ];
                let tempMangaDto = await models_1.mangaModel
                    .aggregate(aggregationStatements)
                    .exec();
                mangaDtos = tempMangaDto.concat(mangaDtos);
            }
            for (let i = 0; i < mangaDtos.length; i++) {
                const chapterData = (await models_1.chapterModel
                    .find({ manga: mangaDtos[i].id })
                    .sort({ index: -1 })
                    .limit(1))[0];
                mangaDtos[i].briefChapterDto = models_1.briefChapterDtoOf(chapterData);
                chapterData.mangaNames = mangaDtos[i].names;
                if (period != "all") {
                    mangaDtos[i].averageRate = await getPeriodAVGRate(mangaDtos[i].id, period);
                    mangaDtos[i].views = await getPeriodViews(mangaDtos[i].id, period);
                    mangaDtos[i].bookmarks = await getPeriodFollows(mangaDtos[i].id, period);
                }
                else {
                    const agg = [
                        {
                            $match: {
                                id: mangaDtos[i].id,
                            },
                        },
                        {
                            $lookup: {
                                from: "bookmarks",
                                localField: "id",
                                foreignField: "manga",
                                as: "bookmarkDocs",
                            },
                        },
                        {
                            $set: {
                                bookmarks: {
                                    $size: "$bookmarkDocs",
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "views",
                                localField: "id",
                                foreignField: "manga",
                                as: "viewDocs",
                            },
                        },
                        {
                            $set: {
                                views: {
                                    $size: "$viewDocs",
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "manga-rates",
                                localField: "id",
                                foreignField: "manga",
                                as: "rateDocs",
                            },
                        },
                        {
                            $set: {
                                averageRate: {
                                    $divide: [
                                        {
                                            $sum: "$rateDocs.rate",
                                        },
                                        {
                                            $cond: [
                                                {
                                                    $eq: [
                                                        {
                                                            $size: "$rateDocs",
                                                        },
                                                        0,
                                                    ],
                                                },
                                                1,
                                                {
                                                    $size: "$rateDocs",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "chapters",
                                localField: "id",
                                foreignField: "manga",
                                as: "chapterDocs",
                            },
                        },
                        {
                            $set: {
                                briefChapterDto: {
                                    $last: "$chapterDocs",
                                },
                            },
                        },
                        {
                            $unset: ["viewDocs", "rateDocs", "bookmarkDocs", "chapterDocs"],
                        },
                    ];
                    let data = await models_1.mangaModel.aggregate(agg).exec();
                    let tempMangaDtos = data.map((item) => models_1.briefMangaDtoOf(item));
                    mangaDtos[i].averageRate = tempMangaDtos.averageRate;
                    mangaDtos[i].views = tempMangaDtos.views;
                    mangaDtos[i].bookmarks = tempMangaDtos.bookmarks;
                }
            }
            if (sort === "view") {
                if (order === "desc") {
                    mangaDtos.sort((a, b) => {
                        if (b.views === undefined || a.views === undefined) {
                            return -1;
                        }
                        return b.views - a.views;
                    });
                }
                else if (order === "asc") {
                    mangaDtos.sort((a, b) => {
                        if (b.views === undefined || a.views === undefined) {
                            return -1;
                        }
                        return a.views - b.views;
                    });
                }
            }
            else if (sort === "follow") {
                if (order === "desc") {
                    mangaDtos.sort((a, b) => {
                        if (b.bookmarks === undefined || a.bookmarks === undefined) {
                            return -1;
                        }
                        return b.bookmarks - a.bookmarks;
                    });
                }
                else if (order === "asc") {
                    mangaDtos.sort((a, b) => {
                        if (b.bookmarks === undefined || a.bookmarks === undefined) {
                            return -1;
                        }
                        return a.bookmarks - b.bookmarks;
                    });
                }
            }
            else if (sort === "rate") {
                if (order === "desc") {
                    mangaDtos.sort((a, b) => {
                        if (b.averageRate === undefined || a.averageRate === undefined) {
                            return -1;
                        }
                        return b.averageRate - a.averageRate;
                    });
                }
                else if (order === "asc") {
                    mangaDtos.sort((a, b) => {
                        if (b.averageRate === undefined || a.averageRate === undefined) {
                            return -1;
                        }
                        return a.averageRate - b.averageRate;
                    });
                }
            }
            else if (sort === "date") {
                if (order === "desc") {
                    mangaDtos.sort((a, b) => {
                        if (b.updatedAt === undefined || a.updatedAt === undefined) {
                            return -1;
                        }
                        return b.updatedAt.getTime() - a.updatedAt.getTime();
                    });
                }
                else if (order === "asc") {
                    mangaDtos.sort((a, b) => {
                        if (b.updatedAt === undefined || a.updatedAt === undefined) {
                            return -1;
                        }
                        return -b.updatedAt.getTime() + a.updatedAt.getTime();
                    });
                }
            }
            // console.log(sort);
            mangaDtos.forEach((element) => {
                if (sort === "view")
                    console.log(element.views);
                if (sort === "date")
                    console.log(element.updatedAt?.getTime());
                if (sort === "follow")
                    console.log(element.bookmarks);
                if (sort === "rate")
                    console.log(element.averageRate);
                console.log("-------------");
            });
            console.log(mangaDtos.length);
            console.log(period);
            if (period === "all" || sort != "date")
                return mangaDtos;
            let periodMangaDtos = [];
            mangaDtos.forEach((element) => {
                let tempDate = element.updatedAt || new Date(0);
                // console.log(tempDate);
                // console.log("-------------");
                if (period === "weekly") {
                    console.log(inCurrentWeek(tempDate));
                    if (inCurrentWeek(tempDate) === true)
                        periodMangaDtos.push(element);
                }
                else if (period === "monthly") {
                    console.log(inCurrentMonth(tempDate));
                    if (inCurrentMonth(tempDate) === true)
                        periodMangaDtos.push(element);
                }
            });
            // console.log(mangaDtos);
            return periodMangaDtos;
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
function inCurrentWeek(thisDate) {
    let today = new Date();
    today.setHours(0, 0, 1);
    let firstDateOfWeek = today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
    let lastDateOfWeek = firstDateOfWeek + 6;
    let firstDay = new Date(today.getFullYear(), today.getMonth(), firstDateOfWeek);
    console.log(firstDay);
    let lastDay = new Date(today.getFullYear(), today.getMonth(), lastDateOfWeek);
    console.log(lastDay);
    return thisDate >= firstDay && thisDate <= lastDay;
}
function firstDateOfWeek() {
    let today = new Date();
    today.setHours(0, 0, 1);
    let firstDateOfWeek = today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
    return new Date(today.getFullYear(), today.getMonth(), firstDateOfWeek);
}
function lastDateOfWeek() {
    let today = new Date();
    today.setHours(0, 0, 1);
    let firstDateOfWeek = today.getDate() - today.getDay() + (today.getDate() == 0 ? -6 : 1);
    let lastDateOfWeek = firstDateOfWeek + 6;
    return new Date(today.getFullYear(), today.getMonth(), lastDateOfWeek);
}
function firstDateOfMonth() {
    let thisMonth = new Date();
    thisMonth.setHours(0, 0, 1);
    return new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
}
function lastDateOfMonth() {
    let thisMonth = new Date();
    thisMonth.setHours(0, 0, 1);
    return new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
}
function inCurrentMonth(thisDate) {
    let thisMonth = new Date();
    thisMonth.setHours(0, 0, 1);
    let firstDay = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
    let lastDay = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
    if (thisDate === undefined)
        return false;
    return thisDate >= firstDay && thisDate <= lastDay;
}
async function getPeriodAVGRate(id, period) {
    let aggregationStatements = [
        {
            $match: {
                _id: id,
            },
        },
    ];
    let mangaRates = [];
    mangaRates = await models_1.mangaRateModel.aggregate(aggregationStatements).exec();
    let sum = 0;
    let numRate = 0;
    mangaRates.forEach((element) => {
        let tempDate = element.updatedAt || new Date(0);
        if (period === "weekly") {
            if (tempDate >= firstDateOfWeek() && tempDate <= lastDateOfWeek()) {
                numRate += 1;
                sum += element.rate;
            }
        }
        else if (period === "monthly") {
            if (tempDate >= firstDateOfMonth() && tempDate <= lastDateOfMonth()) {
                numRate += 1;
                sum += element.rate;
            }
        }
    });
    let avg = sum / numRate;
    return avg;
}
async function getPeriodViews(id, period) {
    let aggregationStatements = [
        {
            $match: {
                _id: id,
            },
        },
    ];
    let mangaViewDocs = [];
    mangaViewDocs = await models_1.mangaChapterViewModel
        .aggregate(aggregationStatements)
        .exec();
    let sum = 0;
    mangaViewDocs.forEach((element) => {
        let tempDate = element.updatedAt || new Date(0);
        if (period === "weekly") {
            if (tempDate >= firstDateOfWeek() && tempDate <= lastDateOfWeek()) {
                sum += 1;
            }
        }
        else if (period === "monthly") {
            if (tempDate >= firstDateOfMonth() && tempDate <= lastDateOfMonth()) {
                sum += 1;
            }
        }
    });
    return sum;
}
async function getPeriodFollows(id, period) {
    let aggregationStatements = [
        {
            $match: {
                _id: id,
            },
        },
    ];
    let mangaBookmarks = [];
    mangaBookmarks = await models_1.bookmarkModel.aggregate(aggregationStatements).exec();
    let sum = 0;
    mangaBookmarks.forEach((element) => {
        let tempDate = element.updatedAt || new Date(0);
        if (period === "weekly") {
            if (tempDate >= firstDateOfWeek() && tempDate <= lastDateOfWeek()) {
                sum += 1;
            }
        }
        else if (period === "monthly") {
            if (tempDate >= firstDateOfMonth() && tempDate <= lastDateOfMonth()) {
                sum += 1;
            }
        }
    });
    return sum;
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
