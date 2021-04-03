import express from "express";
import { MangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/most-view", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await MangaController.getTopMostViewAsync(5);
	res.json(mangas);
});

router.get("/most-followed", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await MangaController.getTopMostFollowAsync(5);
	res.json(mangas);
});

router.get("/most-rating", async (req, res) => {
	let timePeriod = req.query.period === undefined ? req.query.period : "all";

	let mangas = await MangaController.getTopMostRatingAsync(5, timePeriod);
	res.json(mangas);
});

const homeRouter = router;

export default homeRouter;
