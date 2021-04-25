"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const route = express_1.default.Router();
route.get("/", passport_1.default.authenticate("jwt", {
    session: false,
}), async (req, res) => {
    res.json(req.headers);
});
const userRoute = route;
exports.default = userRoute;
