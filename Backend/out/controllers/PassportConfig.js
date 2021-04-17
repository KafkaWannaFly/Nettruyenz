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
        done(null, myUser.email);
    });
    passport.deserializeUser(async (email, done) => {
        let user = await UserController_1.UserController.getUserAsync(email);
        done(null, user);
    });
    passport.use("local-signin", new passport_local_1.default.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            let user = await UserController_1.UserController.getUserAsync(email);
            if (user === undefined) {
                console.log(`Login fail. Can't find user`);
                done(null, undefined, {
                    message: "Login fail. Can't find user",
                });
                return;
            }
            if (await bcrypt_1.default.compare(password, user.password)) {
                console.log(`Login success!\n${JSON.stringify(user, null, 4)}`);
                return done(null, user, {
                    message: "Login success!",
                });
            }
            else {
                done(null, undefined, {
                    message: "Incorrect password",
                });
            }
        }
        catch (error) {
            done(error);
        }
    }));
    passport.use("local-signup", new passport_local_1.default.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        let hash = await bcrypt_1.default.hash(password, 10);
        let user = {
            email: email,
            password: hash,
            nickname: req.body.nickname,
            level: UserModel_1.UserLevel.normal,
        };
        console.log(`Sign up request. Create an account.\n${JSON.stringify(user, null, 4)}`);
        if (await UserController_1.UserController.registerUserAsync(user)) {
            console.log(`Sign up successully. Welcome, ${user.nickname}`);
            done(null, user);
        }
        else {
            console.log(`Sign up fail. ${user.email} has already existed`);
            done(null, false, {
                message: "User has already existed",
            });
        }
    }));
}
exports.initPassport = initPassport;
