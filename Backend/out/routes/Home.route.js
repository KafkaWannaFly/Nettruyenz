"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MangaController_1 = require("../controllers/MangaController");
const router = express_1.default.Router();
router.get("/most-view", async (req, res) => {
    let timePeriod = req.query.period === undefined ? req.query.period : "all";
    let mangas = await MangaController_1.MangaController.getTopMostViewAsync(5);
    res.json(mangas);
});
router.get("/most-followed", async (req, res) => {
    let timePeriod = req.query.period === undefined ? req.query.period : "all";
    let mangas = await MangaController_1.MangaController.getTopMostFollowAsync(5);
    res.json(mangas);
});
router.get("/most-rating", async (req, res) => {
    let timePeriod = req.query.period === undefined ? req.query.period : "all";
    let mangas = await MangaController_1.MangaController.getTopMostRatingAsync(5, timePeriod);
    res.json(mangas);
});
const homeRouter = router;
exports.default = homeRouter;
