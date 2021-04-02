"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = require("../models/UserModel");
const UserController_1 = require("./UserController");
function initPassport(passport) {
    passport.serializeUser((user, done) => {
        let myUser = user;
        done(null, myUser.username);
    });
    passport.deserializeUser(async (username, done) => {
        let user = await UserController_1.UserController.getUserAsync(username);
        done(null, user);
    });
    passport.use("local-login", new passport_local_1.default.Strategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            let user = await UserController_1.UserController.getUserAsync(username);
            if (user === undefined) {
                done(null, undefined, {
                    message: "Login fail. Can't find user",
                });
                throw "Login fail. Can't find user";
            }
            if (await bcrypt_1.default.compare(password, user.password)) {
                return done(null, user, {
                    message: "Login success!",
                });
            }
        }
        catch (error) {
            done(error);
        }
    }));
    passport.use("local-signup", new passport_local_1.default.Strategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        let hash = await bcrypt_1.default.hash(req.body.passport, 10);
        let user = {
            username: username,
            password: hash,
            nickname: req.body.nickname,
            level: UserModel_1.UserLevel.normal,
        };
        if (await UserController_1.UserController.registerUserAsync(user)) {
            done(null, user);
        }
        else {
            done(null, false, {
                message: "User has already existed",
            });
        }
    }));
}
exports.initPassport = initPassport;
