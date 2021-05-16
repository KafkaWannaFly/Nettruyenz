import express from "express";
import passport from "passport";
import { chapterController } from "../controllers/ChapterController";
import { mangaChapterViewController } from "../controllers/MangaChapterViewController";
import { User } from "../models";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
	const chapterDto = await chapterController.getChapterById(req.params.id);

	passport.authenticate(
		"jwt",
		{ session: false },
		async (err, user: User, info) => {
			const email = user ? user.email : undefined;

			mangaChapterViewController.createMangaChapterView(
				chapterDto?.manga!!,
				chapterDto?.id!!,
				email
			);
		}
	)(req, res, next);

	res.json(chapterDto);
});

const chapterRoute = router;
export default chapterRoute;
