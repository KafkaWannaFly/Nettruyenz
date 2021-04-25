"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlHtml = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
async function crawlHtml(url, path) {
    let res = await axios_1.default.get(url);
    let dom = new jsdom_1.JSDOM(res.data, {
        contentType: "text/html",
    }).window.document;
    fs_1.default.writeFileSync(path, res.data);
    return dom;
}
exports.crawlHtml = crawlHtml;
