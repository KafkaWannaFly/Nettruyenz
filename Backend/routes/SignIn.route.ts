import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import { SECRET } from "../constants/EnvironmentConstants";
import { emailPasswordValidators } from "../middlewares/RequestValidators";

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
			"local-signin",
			{
				session: false,
			},
			(err, user, info) => {
				if (err || !user) {
					res.json(err);
					return;
				}

				req.login(user, { session: false }, (err) => {
					if (err) {
						res.send(err);
					}

					const token = jwt.sign(user, SECRET as string);
					return res.json({ user, token });
				});
			}
		)(req, res);
	}
);

const signInRoute = route;
export default signInRoute;
