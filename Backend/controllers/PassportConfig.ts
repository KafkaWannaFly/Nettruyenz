import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import _passport from "passport";
import { User, UserLevel } from "../models/UserModel";
import { UserController } from "./UserController";

export function initPassport(passport: typeof _passport) {
	passport.serializeUser((user, done) => {
		let myUser = user as User;
		done(null, myUser.username);
	});

	passport.deserializeUser(async (username: string, done) => {
		let user = await UserController.getUserAsync(username);
		done(null, user);
	});

	passport.use(
		"local-login",
		new passportLocal.Strategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				try {
					let user = await UserController.getUserAsync(username);
					if (user === undefined) {
						done(null, undefined, {
							message: "Login fail. Can't find user",
						});
						throw "Login fail. Can't find user";
					}

					if (await bcrypt.compare(password, user.password)) {
						return done(null, user, {
							message: "Login success!",
						});
					}
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.use(
		"local-signup",
		new passportLocal.Strategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				let hash = await bcrypt.hash(req.body.passport, 10);
				let user: User = {
					username: username,
					password: hash,
					nickname: req.body.nickname,
					level: UserLevel.normal,
				};

				if (await UserController.registerUserAsync(user)) {
					done(null, user);
				} else {
					done(null, false, {
						message: "User has already existed",
					});
				}
			}
		)
	);
}
