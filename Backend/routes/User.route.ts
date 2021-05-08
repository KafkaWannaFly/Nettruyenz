import express from "express";
import passport from "passport";
import { userController } from "../controllers/UserController";
import { User, UserDto, userDtoOf } from "../models";

const route = express.Router();

route.get(
	"/",
	passport.authenticate("jwt", {
		session: false,
	}),
	async (req, res) => {
		const user = req.user as User;

		let userDto: UserDto = userDtoOf(user);

		userDto.bookmarks = await userController.getUserBookmarks(userDto.email);

		userDto.ratesMade = await userController.getUserRatesMade(userDto.email);

		userDto.history = await userController.getUserViewedChapters(userDto.email);

		res.json(userDto);
	}
);

const userRoute = route;
export default userRoute;
