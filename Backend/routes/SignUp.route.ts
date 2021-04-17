import express from "express";
import passport from "passport";
import { UserDto } from "../DTOs/UserDto";

const route = express.Router();

route.post(
	"/",
	passport.authenticate("local-signup", {
		successRedirect: "/sign-up/success",
		failureRedirect: "/sign-up/fail",
	})
);

route.get("/fail", (req, res) => {
	res.send("Email has already existed.");
});

route.get("/success", (req, res) => {
	let userDto = req.user as UserDto;
	res.json(userDto);
});

const signUpRoute = route;
export default signUpRoute;
