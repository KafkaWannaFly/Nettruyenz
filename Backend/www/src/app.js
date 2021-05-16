"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const PassportConfig_1 = require("../middlewares/PassportConfig");
const Categories_route_1 = __importDefault(require("../routes/Categories.route"));
const ForgotPassword_1 = __importDefault(require("../routes/ForgotPassword"));
const Home_route_1 = __importDefault(require("../routes/Home.route"));
const Mangas_route_1 = __importDefault(require("../routes/Mangas.route"));
const SignIn_route_1 = __importDefault(require("../routes/SignIn.route"));
const SignUp_route_1 = __importDefault(require("../routes/SignUp.route"));
const Tag_route_1 = __importDefault(require("../routes/Tag.route"));
const User_route_1 = __importDefault(require("../routes/User.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(
// 	expressSession({
// 		secret: SECRET!,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );
app.use(cookie_parser_1.default(EnvironmentConstants_1.SECRET));
const port = EnvironmentConstants_1.PORT;
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
PassportConfig_1.initPassport(passport_1.default);
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use("/", Home_route_1.default);
app.use("/sign-up", SignUp_route_1.default);
app.use("/sign-in", SignIn_route_1.default);
app.use("/forgot-password", ForgotPassword_1.default);
app.use("/mangas", Mangas_route_1.default);
app.use("/categories", Categories_route_1.default);
app.use("/tags", Tag_route_1.default);
app.use("/user", User_route_1.default);
app.get("/test", (req, res) => {
    res.json(req.headers);
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
