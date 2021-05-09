import express from "express";
const router = express.Router();
import {userController} from "../controllers/UserController"
import { User, UserDto, userDtoOf } from "../models";
const followRouter = router;

router.get("/following-list", async(req, res) => {
    const user = req.user as User;

    let userDto: UserDto = userDtoOf(user);

    let bookmarksList = userController.getUserFollowedList(userDto.email);

    res.json(bookmarksList);
})

export default followRouter;