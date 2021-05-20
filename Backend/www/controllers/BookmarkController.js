"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkController = void 0;
const models_1 = require("../models");
exports.bookmarkController = {
    async saveBookmark(bookmark) {
        return await new models_1.bookmarkModel(bookmark).save();
    },
};
