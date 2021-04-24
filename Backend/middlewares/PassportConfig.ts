import dotenv from "dotenv";
dotenv.config();

import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import _passport from "passport";
import { User, UserLevel, UserModel } from "../models/UserModel";
import { UserController } from "../controllers/UserController";
import { SALT } from "../constants/EnvironmentConstants";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export function initPassport(passport: typeof _passport) {
	passport.serializeUser((user, done) => {
		let myUser = user as User;
		done(null, myUser.email);
	});

	passport.deserializeUser(async (email: string, done) => {
		let user = await UserController.getUserAsync(email);
		done(null, user);
	});

	// local-signin
	passport.use(
		"local-signin",
		new passportLocal.Strategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				try {
					let user = await UserController.getUserAsync(email);
					if (user === undefined) {
						console.log(`Login fail. Can't find user`);

						req.flash("error", "Login fail. Can't find user");

						done(null, false, {
							message: "Login fail. Can't find user",
						});
						return;
					}
					if (await bcrypt.compare(password, user.password)) {
						console.log(`Login success!\n${JSON.stringify(user, null, 4)}`);
						return done(null, user);
					} else {
						let message = "Incorrect password";
						console.log(message);

						req.flash("error", message);
						done(null, false, {
							message: message,
						});
					}
				} catch (error) {
					done(error);
				}
			}
		)
	);

	// local-signup
	passport.use(
		"local-signup",
		new passportLocal.Strategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				let hash = await bcrypt.hash(password, SALT);
				let user: User = {
					email: email,
					password: hash,
					nickname: req.body.nickname,
					level: UserLevel.normal,
				};

				console.log(
					`Sign up request. Create an account.\n${JSON.stringify(
						user,
						null,
						4
					)}`
				);

				if (await UserController.registerUserAsync(user)) {
					console.log(`Sign up successully. Welcome, ${user.nickname}`);

					done(null, user);
				} else {
					let errorMsg = `Sign up fail. ${user.email} has already existed`;

					console.log(errorMsg);

					req.flash("error", errorMsg);

					done(null, false, {
						message: errorMsg,
					});
				}
			}
		)
	);

	// jwt
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.SECRET,
			},
			async (jwtPayload, done) => {
				try {
					console.log(
						`JWT authorization. Payload: ${JSON.stringify(jwtPayload, null, 4)}`
					);

					let user = ((await UserModel.findOne({
						email: jwtPayload.email,
					}).exec()) as unknown) as User;
					done(null, user);
				} catch (error) {
					done(error, false);
				}
			}
		)
	);
}
