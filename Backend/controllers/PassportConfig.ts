import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import _passport from "passport";
import { User, UserLevel } from "../models/UserModel";
import { UserController } from "./UserController";

export function initPassport(passport: typeof _passport) {
	passport.serializeUser((user, done) => {
		let myUser = user as User;
		done(null, myUser.email);
	});

	passport.deserializeUser(async (email: string, done) => {
		let user = await UserController.getUserAsync(email);
		done(null, user);
	});

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

						done(null, undefined, {
							message: "Login fail. Can't find user",
						});
						return;
					}
					if (await bcrypt.compare(password, user.password)) {
						console.log(`Login success!\n${JSON.stringify(user, null, 4)}`);
						return done(null, user, {
							message: "Login success!",
						});
					} else {
						done(null, undefined, {
							message: "Incorrect password",
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
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				let hash = await bcrypt.hash(password, 10);
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
					console.log(`Sign up fail. ${user.email} has already existed`);

					done(null, false, {
						message: "User has already existed",
					});
				}
			}
		)
	);
}
