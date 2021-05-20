import express from "express";
import { mangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/most-view", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await mangaController.getTopMostViewAsync(5, timePeriod);
	res.json(mangas);
});

router.get("/most-followed", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await mangaController.getTopMostFollowAsync(5, timePeriod);
	res.json(mangas);
});

router.get("/most-rating", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await mangaController.getTopMostRatingAsync(5, timePeriod);
	res.json(mangas);
});

router.get("/recently-uploaded", async (req, res) => {
	let mangas = await mangaController.getRecentlyUploadedAsync(5);
	res.json(mangas);
});

router.get("/newly-added", async (req, res) => {
	let mangas = await mangaController.getNewlyAddedAsync(5);
	res.json(mangas);
});

const homeRouter = router;

export default homeRouter;
