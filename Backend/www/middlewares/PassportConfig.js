"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = __importDefault(require("passport-local"));
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const UserController_1 = require("../controllers/UserController");
const models_1 = require("../models");
dotenv_1.default.config();
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
function initPassport(passport) {
    passport.serializeUser((user, done) => {
        let myUser = user;
        done(null, myUser.email);
    });
    passport.deserializeUser(async (email, done) => {
        let user = await UserController_1.UserController.getUserAsync(email);
        done(null, user);
    });
    // local-signin
    passport.use("local-signin", new passport_local_1.default.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            let user = await UserController_1.UserController.getUserAsync(email);
            if (user === undefined) {
                console.log(`Login fail. Can't find user`);
                return done({
                    error: "Login fail. Can't find user",
                }, false);
            }
            if (await bcrypt_1.default.compare(password, user.password)) {
                console.log(`Login success!\n${JSON.stringify(user, null, 4)}`);
                return done(null, user);
            }
            else {
                let message = "Incorrect password";
                console.log(message);
                done({
                    error: message,
                }, false);
            }
        }
        catch (error) {
            done(error);
        }
    }));
    // local-signup
    passport.use("local-signup", new passport_local_1.default.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            let hash = await bcrypt_1.default.hash(password, EnvironmentConstants_1.SALT);
            let user = {
                email: email,
                password: hash,
                nickname: req.body.nickname,
                level: models_1.UserLevel.normal,
            };
            console.log(`Sign up request. Create an account.\n${JSON.stringify(user, null, 4)}`);
            if (await UserController_1.UserController.registerUserAsync(user)) {
                console.log(`Sign up successully. Welcome, ${user.email}`);
                done(null, user);
            }
            else {
                let errorMsg = `Sign up fail. ${user.email} has already existed`;
                console.log(errorMsg);
                done({
                    error: errorMsg,
                }, false);
                // throw errorMsg;
            }
        }
        catch (error) {
            done(error);
        }
    }));
    // jwt
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: EnvironmentConstants_1.SECRET,
    }, async (jwtPayload, done) => {
        try {
            console.log(`JWT authorization. Payload: ${JSON.stringify(jwtPayload, null, 4)}`);
            let user = (await models_1.userModel
                .findOne({
                email: jwtPayload.email,
            })
                .exec());
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    }));
}
exports.initPassport = initPassport;
