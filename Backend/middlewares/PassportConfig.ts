import bcrypt from "bcrypt";
import dotenv from "dotenv";
import passportType from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { SALT, SECRET } from "../constants/EnvironmentConstants";
import { userController } from "../controllers/UserController";
import { User, UserLevel, userModel } from "../models";
dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export function initPassport(passport: typeof passportType) {
	passport.serializeUser((user, done) => {
		let myUser = user as User;
		done(null, myUser.email);
	});

	passport.deserializeUser(async (email: string, done) => {
		let user = await userController.getUserAsync(email);
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
					let user = await userController.getUserAsync(email);
					if (user === undefined) {
						console.log(`Login fail. Can't find user`);

						return done(
							{
								error: "Login fail. Can't find user",
							},
							false
						);
					}
					if (await bcrypt.compare(password, user.password)) {
						console.log(`Login success!\n${JSON.stringify(user, null, 4)}`);
						return done(null, user);
					} else {
						let message = "Incorrect password";
						console.log(message);

						done(
							{
								error: message,
							},
							false
						);
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
				try {
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

					if (await userController.registerUserAsync(user)) {
						console.log(`Sign up successully. Welcome, ${user.email}`);

						done(null, user);
					} else {
						let errorMsg = `Sign up fail. ${user.email} has already existed`;

						console.log(errorMsg);

						done(
							{
								error: errorMsg,
							},
							false
						);

						// throw errorMsg;
					}
				} catch (error) {
					done(error);
				}
			}
		)
	);

	// jwt
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: SECRET,
			},
			async (jwtPayload, done) => {
				try {
					let user = ((await userModel
						.findOne({
							email: jwtPayload.email,
						})
						.exec()) as unknown) as User;
					done(null, user);
				} catch (error) {
					done(error, false);
				}
			}
		)
	);
}
