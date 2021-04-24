"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Crawl authors data from hocvientruyentranh
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const CreatorModel_1 = require("../models/CreatorModel");
const pageCount = 180;
const urlTemplate = "https://hocvientruyentranh.net/authors?page=";
async function crawlCreators(url) {
    let res = await axios_1.default.get(url);
    let dom = new jsdom_1.JSDOM(res.data, {
        contentType: "text/html",
    }).window.document;
    let anchorList = dom.querySelectorAll("tr td a");
    let authors = [];
    anchorList.forEach((item) => {
        if (item.textContent == "") {
            return;
        }
        else {
            let author = {
                name: item.textContent?.trim(),
            };
            authors.push(author);
        }
    });
    return authors;
}
try {
    let promiseAll = [];
    for (let i = 1; i <= pageCount; i++) {
        const creatorsPromise = crawlCreators(urlTemplate + i);
        promiseAll.push(creatorsPromise);
    }
    Promise.all(promiseAll).then(async (res) => {
        let authors = [];
        res.forEach((item) => {
            authors = authors.concat(item);
        });
        console.log(`Found ${authors.length} creators`);
        await CreatorModel_1.CreatorModel.insertMany(authors);
        console.log(`Push ${authors.length} creators into DB`);
    });
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=CrawlCreators.js.map