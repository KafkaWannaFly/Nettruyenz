"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsdom_1 = require("jsdom");
const uuid_1 = require("uuid");
const TagModel_1 = require("../models/TagModel");
const Util_1 = require("./Util");
// Loot from https://hocvientruyentranh.net
async function crawlTags() {
    // Try to read data from online
    let url = "https://hocvientruyentranh.net/";
    let path = "./tests/html/index.html";
    let dom;
    if (!fs_1.default.existsSync(path)) {
        dom = await Util_1.crawlHtml(url, path);
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
            id: uuid_1.v4(),
            name: val.querySelector("a")?.innerHTML.trim(),
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
crawlTags().then(async (tags) => {
    tags.forEach(async (tag) => {
        await TagModel_1.tagModel.updateOne({ name: tag.name }, tag, { upsert: true }).exec();
    });
    console.log(`Create ${tags.length} tags`);
});
