"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const TagModel_1 = __importDefault(require("../models/TagModel"));
// Loot from https://hocvientruyentranh.net
async function crawlTags() {
    // Try to read data from online
    let path = "./tests/index.html";
    let dom;
    if (!fs_1.default.existsSync(path)) {
        let res = await axios_1.default.get("https://hocvientruyentranh.net/");
        dom = new jsdom_1.JSDOM(res.data, {
            contentType: "text/html",
        }).window.document;
        fs_1.default.writeFileSync(path, res.data);
    }
    else {
        let data = fs_1.default.readFileSync(path);
        dom = new jsdom_1.JSDOM(data, {
            contentType: "text/html",
        }).window.document;
    }
    let cateListItems = dom?.querySelector(".submenu")?.children;
    console.log(`submenu children number: ${cateListItems?.length}`);
    let liArray = cateListItems ? [...cateListItems] : [];
    let tagItems = liArray.slice(10);
    let tags = tagItems.flatMap((val, index) => {
        let tag = {
            id: "",
            name: val.querySelector("a")?.innerHTML,
            url: val.querySelector("a")?.href,
        };
        // Filter out those unwanted tags
        if (tag.name.match("Truyện") ||
            tag.name.match("Webtoon") ||
            tag.name.match("Trưởng") ||
            tag.name.match("Truyền") ||
            tag.name.match("Doujinshi")) {
            return [];
        }
        return tag;
    });
    return tags;
}
// DELETE ALL TAGS AND REWRITE AGAIN
crawlTags().then((res) => {
    console.log(res);
    TagModel_1.default.deleteMany({}).then((_) => {
        TagModel_1.default.insertMany(res);
    });
});
