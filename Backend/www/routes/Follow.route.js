"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = require("../controllers/UserController");
const models_1 = require("../models");
const followRouter = router;
router.get("/following-list", async (req, res) => {
    const user = req.user;
    let userDto = models_1.userDtoOf(user);
    let bookmarksList = UserController_1.userController.getUserFollowedList(userDto.email);
    res.json(bookmarksList);
});
exports.default = followRouter;
