import express from "express";
import passport from "passport";
import { bookmarkController } from "../controllers/BookmarkController";
import { userController } from "../controllers/UserController";
import { Bookmark, User, UserDto, userDtoOf } from "../models";
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

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = req.user as User;
		const bookmark = req.body.bookmark as Bookmark;

		bookmark.email = user.email;

		const doc = await bookmarkController.saveBookmark(bookmark);
		console.log(`Bookmark: ${JSON.stringify(doc, null, 4)}`);

		res.json({ message: "Success!" });
	}
);

const bookmarkRoute = router;

export default bookmarkRoute;
