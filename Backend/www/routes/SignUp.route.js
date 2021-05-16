"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const RequestValidators_1 = require("../middlewares/RequestValidators");
const route = express_1.default.Router();
route.post("/", RequestValidators_1.emailPasswordValidators(), async (req, res, next) => {
    passport_1.default.authenticate("local-signup", {
        session: false,
        passReqToCallback: true,
    }, (err, user, info) => {
        console.log(`Authenticate callback`);
        if (err || !user) {
            res.json(err);
            return;
        }
        console.log(`Next middleware`);
        req.user = user;
        next();
    })(req, res);
}, async (req, res) => {
    let userDto = req.user;
    console.log(`Response userDto: ${JSON.stringify(userDto, null, 4)}`);
    res.json(userDto);
});
const signUpRoute = route;
exports.default = signUpRoute;
