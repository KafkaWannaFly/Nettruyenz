"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const RequestValidators_1 = require("../middlewares/RequestValidators");
const route = express_1.default.Router();
route.post("/", RequestValidators_1.emailPasswordValidators(), async (req, res, next) => {
    passport_1.default.authenticate("local-signin", {
        session: false,
    }, (err, user, info) => {
        if (err || !user) {
            res.json(err);
            return;
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jsonwebtoken_1.default.sign(user, EnvironmentConstants_1.SECRET);
            return res.json({ user, token });
        });
    })(req, res);
});
const signInRoute = route;
exports.default = signInRoute;
