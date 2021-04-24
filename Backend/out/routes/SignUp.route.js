"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const route = express_1.default.Router();
route.post("/", passport_1.default.authenticate("local-signup", {
// successRedirect: "/sign-up/success",
// failureRedirect: "/sign-up/fail",
}), async (req, res) => {
    let userDto = req.user;
    res.json(userDto);
});
// route.get("/fail", (req, res) => {
// 	const error = {
// 		message: req.flash("error")[0],
// 	};
// 	res.json(error);
// });
// route.get("/success", (req, res) => {
// 	let userDto = req.user as UserDto;
// 	res.json(userDto);
// });
const signUpRoute = route;
exports.default = signUpRoute;
//# sourceMappingURL=SignUp.route.js.map