"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUser = exports.crawlHtml = exports.shuffle = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const models_1 = require("../models");
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
exports.shuffle = shuffle;
async function crawlHtml(url, path) {
    let res = await axios_1.default.get(url);
    let dom = new jsdom_1.JSDOM(res.data, {
        contentType: "text/html",
    }).window.document;
    fs_1.default.writeFileSync(path, res.data);
    return dom;
}
exports.crawlHtml = crawlHtml;
async function getRandomUser() {
    const agg = [{ $sample: { size: 1 } }];
    let user = (await models_1.userModel.aggregate(agg).exec())[0];
    return user;
}
exports.getRandomUser = getRandomUser;
