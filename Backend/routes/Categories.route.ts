import express, { query } from "express";
import { MangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/find-manga", async (req, res) => {
    let subPeriod = req.query.period === undefined ? req.query.period: "all";

    let tags = req.query.tags as string[];
    let authName = req.query.creator as string;
    let mangaTitle = req.query.title as string;
    let sort = req.query.sort as string;
    let order = req.query.status as string;

    if (tags === undefined
        && authName === undefined
        && mangaTitle === undefined
        && sort === undefined
        && order === undefined)
    {
        let mangas = await MangaController.getAllRecentlyUploaded();
        res.json(mangas);
    } else {
        let mangas = MangaController.getMangasForCate(tags, mangaTitle, authName, subPeriod, sort, order);
        res.json(mangas);
    }
});

router.get("/all-author", async(req, res)=> {
    let name = req.query.creator as string;

    let creators = await MangaController.getAllAuthor(name);
    res.json(creators);
});

const cateRoute = router;

export default cateRoute;