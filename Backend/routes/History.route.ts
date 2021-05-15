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

		let historyList = userController.getUserReadingHistory(userDto.email);
		res.json(historyList);
	}
);

const historyRouter = router;

export default historyRouter;
