"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const MangaModel_1 = __importDefault(require("../models/MangaModel"));
router.post("/findRank", function (req, res) {
    const mangaID = '';
    const findMangaByID = MangaModel_1.default.findById(mangaID).exec();
    if (findMangaByID == null)
        res.json(null);
    const ranking = {
        name: findMangaByID.names,
        rank: findMangaByID.rating
    };
    res.json(ranking);
});
const rankRouter = router;
exports.default = rankRouter;
