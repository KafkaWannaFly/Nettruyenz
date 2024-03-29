"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const UserController_1 = require("../controllers/UserController");
const models_1 = require("../models");
const route = express_1.default.Router();
route.get("/", passport_1.default.authenticate("jwt", {
    session: false,
}), async (req, res) => {
    const user = req.user;
    let userDto = models_1.userDtoOf(user);
    userDto.bookmarks = await UserController_1.userController.getUserBookmarks(userDto.email);
    userDto.ratesMade = await UserController_1.userController.getUserRatesMade(userDto.email);
    userDto.history = await UserController_1.userController.getUserViewedChapters(userDto.email);
    res.json(userDto);
});
const userRoute = route;
exports.default = userRoute;
