import express from "express";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { emailPasswordValidators } from "../middlewares/RequestValidators";
import { UserDto } from "../models";

const route = express.Router();

route.post(
	"/",
	emailPasswordValidators(),
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
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
	async (req: express.Request, res: express.Response) => {
		let userDto = req.user as UserDto;
		console.log(`Response userDto: ${JSON.stringify(userDto, null, 4)}`);
		res.json(userDto);
	}
);

const signUpRoute = route;
export default signUpRoute;
