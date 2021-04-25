import express from "express";
import passport from "passport";
import { UserDto } from "../models";

const route = express.Router();

route.get(
	"/",
	passport.authenticate("jwt", {
		session: false,
	}),
	async (req, res) => {
		res.json(req.headers);
	}
);

const userRoute = route;
export default userRoute;
