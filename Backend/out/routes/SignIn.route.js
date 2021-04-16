"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const route = express_1.default.Router();
route.post("/", passport_1.default.authenticate("local-signin", {
    successRedirect: "/sign-in/success",
    failureRedirect: "/sign-in/fail",
}));
route.get("/success", (req, res) => {
    let userDto = req.user;
    res.json(userDto);
});
route.get("/fail", (req, res) => {
    res.send("Incorrect email or password.");
});
const signInRoute = route;
exports.default = signInRoute;
