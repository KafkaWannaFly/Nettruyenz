import express from "express";
import { mangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/:mangaId", async (req, res) => {
	let id = req.params.mangaId;
	if (id == undefined) {
		res.status(404).send("Can't see mangaId!");
	}

	let mangaDtos = await mangaController.getCompletedMangaDtoByIdAsync(id);
	res.json(mangaDtos);
});

const mangaRoute = router;
export default mangaRoute;
