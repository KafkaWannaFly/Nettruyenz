"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const UserController_1 = require("../controllers/UserController");
const models_1 = require("../models");
const router = express_1.default.Router();
router.get("/", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    const user = req.user;
    let userDto = models_1.userDtoOf(user);
    let historyList = UserController_1.userController.getUserReadingHistory(userDto.email);
    res.json(historyList);
});
const historyRouter = router;
exports.default = historyRouter;
