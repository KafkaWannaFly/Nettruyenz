"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MangaController_1 = require("../controllers/MangaController");
const router = express_1.default.Router();
router.get("/get-all", async (req, res) => {
    let mangaDtos = await MangaController_1.mangaController.getAllCompletedMangaDtoAsync();
    res.json(mangaDtos);
});
router.get("/:mangaId", async (req, res) => {
    let id = req.params.mangaId;
    if (id == undefined) {
        res.status(404).send("Can't see mangaId!");
    }
    let mangaDtos = await MangaController_1.mangaController.getCompletedMangaDtoByIdAsync(id);
    res.json(mangaDtos);
});
const mangaRoute = router;
exports.default = mangaRoute;
