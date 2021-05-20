"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = require("../models/UserModel");
const EnvironmentConstants_1 = require("../constants/EnvironmentConstants");
const saltRound = EnvironmentConstants_1.SALT;
const normalUserNumber = 10;
const defaultPassword = "123";
async function createFakeUsers(number, defaultPass) {
    let users = [];
    for (let i = 0; i < number; i++) {
        let user = {
            email: faker_1.default.internet.email(),
            password: await bcrypt_1.default.hash(defaultPass, saltRound),
            nickname: `${faker_1.default.name.firstName()} ${faker_1.default.name.lastName()}`,
            avatar: faker_1.default.image.imageUrl(),
            level: UserModel_1.UserLevel.normal,
        };
        users.push(user);
    }
    return users;
}
try {
    createFakeUsers(normalUserNumber, defaultPassword).then(async (users) => {
        // Create a boss
        let mod = {
            email: "18127084@student.hcmus.edu.vn",
            password: await bcrypt_1.default.hash(defaultPassword, saltRound),
            nickname: "Kafka Wanna Fly",
            level: UserModel_1.UserLevel.moderator,
            avatar: "https://en.gravatar.com/userimage/160211096/bb2f6fdf53965cbc01bb4c2f7e8c320d.jpg?size=200",
        };
        let mod2 = {
            email: "18127101@student.hcmus.edu.vn",
            password: await bcrypt_1.default.hash(defaultPassword, saltRound),
            nickname: "Việt Hoàng",
            level: UserModel_1.UserLevel.moderator,
            avatar: "https://en.gravatar.com/userimage/160211096/bb2f6fdf53965cbc01bb4c2f7e8c320d.jpg?size=200",
        };
        users.push(mod);
        users.push(mod2);
        console.log(users);
        await UserModel_1.userModel.insertMany(users);
        console.log(`Insert ${users.length} into DB`);
    });
}
catch (error) {
    console.error(error);
}
