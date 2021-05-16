import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { PORT, SECRET } from "../constants/EnvironmentConstants";
import { initPassport } from "../middlewares/PassportConfig";
import cateRoute from "../routes/Categories.route";
import forgotPasswordRoute from "../routes/ForgotPassword";
import homeRouter from "../routes/Home.route";
import mangaRoute from "../routes/Mangas.route";
import signInRoute from "../routes/SignIn.route";
import signUpRoute from "../routes/SignUp.route";
import tagRoute from "../routes/Tag.route";
import userRoute from "../routes/User.route";
import cors from "cors";
import bookmarkRoute from "../routes/Bookmarks.route";
import historyRoute from "../routes/History.route";
import chapterRoute from "../routes/Chapters.route";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	expressSession({
// 		secret: SECRET!,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );
app.use(cookieParser(SECRET));

const port = PORT;

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

app.use(morgan("dev"));

app.use(cors());

app.use("/", homeRouter);

app.use("/sign-up", signUpRoute);

app.use("/sign-in", signInRoute);

app.use("/forgot-password", forgotPasswordRoute);

app.use("/mangas", mangaRoute);

app.use("/chapters", chapterRoute);

app.use("/categories", cateRoute);

app.use("/bookmarks", bookmarkRoute);

app.use("/history", historyRoute);

app.use("/tags", tagRoute);

app.use("/user", userRoute);

app.get("/test", (req, res) => {
	res.json(req.headers);
});

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
