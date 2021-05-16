"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaChapterViewController = void 0;
const models_1 = require("../models");
exports.mangaChapterViewController = {
    async createMangaChapterView(mangaId, chapterId, email) {
        const mangaChapterView = {
            chapter: chapterId,
            manga: mangaId,
            email: email,
        };
        const mangaChapterViewDoc = await new models_1.mangaChapterViewModel(mangaChapterView).save();
        return mangaChapterViewDoc;
    },
};
