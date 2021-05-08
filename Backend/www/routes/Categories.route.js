"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MangaController_1 = require("../controllers/MangaController");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    // let timePeriod = req.query.period === undefined ? req.query.period:"all";
    // let title = req.query.title;
    // let author = req.query.author
    // let tags = req.query.tags
    // res.send(`title=${title} author=${author} tags=${JSON.stringify(tags, null, 3)}`)
    let mangas = MangaController_1.MangaController.getRecentlyUploadedAsync(16);
    res.json(mangas);
});
router.get("/find-manga", async (req, res) => {
    let timePeriod = req.query.period === undefined ? req.query.period : "all";
    let tags = req.query.tags;
    let authName = req.query.author;
    let mangas = MangaController_1.MangaController.getMangasForCate(16, tags, authName);
    res.json(mangas);
});
// router.get("/get-tags", async(req,res) => {
//     let tags = MangaController.getMangaTags;
//     res.json(tags);
// })
const cateRoute = router;
exports.default = cateRoute;
