import express from "express";
const router = express.Router();

router.post("/", function (req, res) {
	// const mangaID = '';
	// const findMangaByID = mangaModel.findById(mangaID).exec();
	// if (findMangaByID == null)
	//     res.json(null);
	// const ranking = {
	//     name: findMangaByID.names,
	//     rank: findMangaByID.rating
	// };
	// res.json(ranking);
});

const rankRouter = router;

export default rankRouter;
