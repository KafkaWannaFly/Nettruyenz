import express, { query } from "express";
import { mangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/", async (req, res) => {
	let subPeriod = req.query.period as string;

	let tags = req.query.tags as string[];
	let authName = req.query.creator as string;
	let mangaTitle = req.query.title as string;
	let sort = req.query.sortBy as string;
	let order = req.query.order as string;

	if (
		tags === undefined &&
		authName === undefined &&
		mangaTitle === undefined &&
		sort === undefined &&
		order === undefined
	) {
		let mangas = await mangaController.getAllRecentlyUploaded();
		res.json(mangas);
	} else {
		let mangas = await mangaController.getMangasForCate(
			tags,
			mangaTitle,
			authName,
			subPeriod,
			sort,
			order
		);
		// console.log(mangas);
		res.json(mangas);
	}
});

//Test area
router.get("/all-author", async (req, res) => {
	let name = req.query.creator as string;

	let creators = await mangaController.getAllAuthor(name);
	res.json(creators);
});

router.get("/find-by-name", async (req, res) => {
	let name = req.query.title as string;

	let mangas = await mangaController.getMangaByName(name);
	res.json(mangas);
});

router.get("/find-by-tags", async (req, res) => {
	let tags = req.query.tags as string[];

	let mangas = await mangaController.getMangaByTag(tags);
	// tags.forEach(element => {
	//     console.log(element)
	// });
	res.json(mangas);
});

//End of test area

const cateRoute = router;

export default cateRoute;
