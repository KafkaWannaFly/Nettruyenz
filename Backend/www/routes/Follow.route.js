"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const followRouter = router;
// router.get("/following-list", async(req, res) => {
//     const user = req.user as User;
//     let userDto: UserDto = userDtoOf(user);
//     //let bookmarksList = userController.getUserFollowedList(userDto.email);
//     res.json(bookmarksList);
// })
exports.default = followRouter;
