import express from "express";
import passport from "passport";
import { UserDto } from "../DTOs/UserDto";

const route = express.Router();

route.post(
	"/",
	passport.authenticate("local-signin", {
		successRedirect: "/sign-in/success",
		failureRedirect: "/sign-in/fail",
	})
);

route.get("/success", (req, res) => {
	let userDto = req.user as UserDto;
	res.json(userDto);
});

route.get("/fail", (req, res) => {
	res.send("Incorrect email or password.");
});

const signInRoute = route;
export default signInRoute;
