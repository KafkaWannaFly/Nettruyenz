import express from "express";
import passport from "passport";
import { UserDto } from "../DTOs/UserDto";

const route = express.Router();

route.post(
	"/",
	async (req, res, next) => {
		passport.authenticate(
			"local-signup",
			{
				session: false,
				passReqToCallback: true,
			},
			(err, user, info) => {
				console.log(`Authenticate callback`);

				if (err || !user) {
					res.json(err);
					return;
				}

				console.log(`Next middleware`);
				req.user = user;
				next();
			}
		)(req, res);
	},
	async (req, res) => {
		let userDto = req.user as UserDto;
		console.log(`Response userDto: ${JSON.stringify(userDto, null, 4)}`);
		res.json(userDto);
	}
);

const signUpRoute = route;
export default signUpRoute;
