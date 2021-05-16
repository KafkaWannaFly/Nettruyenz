import express from "express";
import passport from "passport";
import { userController } from "../controllers/UserController";
import { User, UserDto, userDtoOf } from "../models";
const router = express.Router();

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = req.user as User;

		let userDto: UserDto = userDtoOf(user);

		let bookmarkDtos = await userController.getUserBookmarks(userDto.email);
		res.json(bookmarkDtos);
	}
);

const bookmarkRoute = router;

export default bookmarkRoute;
