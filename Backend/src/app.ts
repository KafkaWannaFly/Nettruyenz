import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import passport from "passport";
import { initPassport } from "../controllers/PassportConfig";
import { User } from "../models/UserModel";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SECRET as string,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(cookieParser(process.env.SECRET as string));

const port = process.env.PORT;

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

app.get("/", (req, res) => {
	let user = req.user as User;
});

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
