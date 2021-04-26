"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagController = void 0;
const models_1 = require("../models");
exports.tagController = {
    getTagsAsync: async () => {
        let tags = await models_1.tagModel.find({}).lean().exec();
        return tags.map((tag) => tag);
    },
};
