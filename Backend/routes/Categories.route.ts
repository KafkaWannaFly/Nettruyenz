import express, { query } from "express";
import { MangaController } from "../controllers/MangaController";
const router = express.Router();

router.get("/", async (req, res) => {
    // let timePeriod = req.query.period === undefined ? req.query.period:"all";

    // let title = req.query.title;
    // let author = req.query.author
    // let tags = req.query.tags

    // res.send(`title=${title} author=${author} tags=${JSON.stringify(tags, null, 3)}`)

    let mangas = MangaController.getRecentlyUploadedAsync(16);
    res.json(mangas);
})

router.get("/find-manga", async (req, res) => {
    let timePeriod = req.query.period === undefined ? req.query.period: "all";

    let tags = req.query.tags as string[];
    let authName = req.query.author as string;

    let mangas = MangaController.getMangasForCate(16, timePeriod, tags, authName);
    res.json(mangas);
})

router.get("/get-tags", async(req,res) => {
    let tags = MangaController.getMangaTags;
    res.json(tags);
})

const cateRoute = router;

export default cateRoute;