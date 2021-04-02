"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const PassportConfig_1 = require("../controllers/PassportConfig");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cookie_parser_1.default(process.env.SECRET));
const port = process.env.PORT;
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
PassportConfig_1.initPassport(passport_1.default);
app.get("/", (req, res) => {
    let user = req.user;
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
