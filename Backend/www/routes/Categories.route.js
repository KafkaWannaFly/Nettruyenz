"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MangaController_1 = require("../controllers/MangaController");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    let subPeriod = req.query.period;
    let tags = req.query.tags;
    let authName = req.query.creator;
    let mangaTitle = req.query.title;
    let sort = req.query.sortBy;
    let order = req.query.order;
    if (tags === undefined
        && authName === undefined
        && mangaTitle === undefined
        && sort === undefined
        && order === undefined) {
        let mangas = await MangaController_1.MangaController.getAllRecentlyUploaded();
        res.json(mangas);
    }
    else {
        let mangas = await MangaController_1.MangaController.getMangasForCate(tags, mangaTitle, authName, subPeriod, sort, order);
        // console.log(mangas);
        res.json(mangas);
    }
});
//Test area
router.get("/all-author", async (req, res) => {
    let name = req.query.creator;
    let creators = await MangaController_1.MangaController.getAllAuthor(name);
    res.json(creators);
});
router.get("/find-by-name", async (req, res) => {
    let subPeriod = req.query.period === undefined ? req.query.period : "all";
    let name = req.query.title;
    let id = req.query.id;
    let mangas = await MangaController_1.MangaController.getMangaByName(name, id, subPeriod);
    res.json(mangas);
});
router.get("/find-by-tags", async (req, res) => {
    let tags = req.query.tags;
    let mangas = await MangaController_1.MangaController.getMangaByTag(tags);
    // tags.forEach(element => {
    //     console.log(element)
    // });
    res.json(mangas);
});
//End of test area
const cateRoute = router;
exports.default = cateRoute;
