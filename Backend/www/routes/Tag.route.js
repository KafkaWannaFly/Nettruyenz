"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagController_1 = require("../controllers/TagController");
const route = express_1.default.Router();
route.get("/", async (req, res) => {
    let tags = (await TagController_1.tagController.getTagsAsync()).map((tag) => {
        return {
            // id: tag._id,
            name: tag.name,
        };
    });
    res.json(tags);
});
const tagRoute = route;
exports.default = tagRoute;
