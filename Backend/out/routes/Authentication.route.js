"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const route = express_1.default.Router();
route.post("/", passport_1.default.authenticate("local-signup", {
    successRedirect: "/sign-in",
    failureRedirect: "/sign-up",
    failureFlash: true,
}));
const authenticattionRoute = route;
exports.default = authenticattionRoute;
