"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MangaController_1 = require("../controllers/MangaController");
const router = express_1.default.Router();
router.get("/find-manga", async (req, res) => {
    let subPeriod = req.query.period === undefined ? req.query.period : "all";
    let tags = req.query.tags;
    let authName = req.query.creator;
    let mangaTitle = req.query.title;
    let sort = req.query.sort;
    let order = req.query.status;
    if (tags === undefined
        && authName === undefined
        && mangaTitle === undefined
        && sort === undefined
        && order === undefined) {
        let mangas = await MangaController_1.MangaController.getAllRecentlyUploaded();
        res.json(mangas);
    }
    else {
        let mangas = MangaController_1.MangaController.getMangasForCate(tags, mangaTitle, authName, subPeriod, sort, order);
        res.json(mangas);
    }
});
router.get("/all-author", async (req, res) => {
    let name = req.query.creator;
    let creators = await MangaController_1.MangaController.getAllAuthor(name);
    res.json(creators);
});
const cateRoute = router;
exports.default = cateRoute;
