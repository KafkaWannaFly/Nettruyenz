import express from "express";
import passport from "passport";
import { mangaRateController } from "../controllers/MangaRateController";
import { User } from "../models";

const router = express.Router();

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = req.user as User;
		const { rate, mangaId } = req.body;

		const result = await mangaRateController.rateMangaAsync(
			user.email,
			mangaId,
			rate
		);

		res.json({ result });
	}
);

router.post(
	"/clear",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = req.user as User;
		const { mangaId } = req.body;
		const result = mangaRateController.clearMangaRateAsync(user.email, mangaId);

		res.json({ result });
	}
);

const rateRoute = router;
export default rateRoute;
