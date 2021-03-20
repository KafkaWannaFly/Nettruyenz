"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const TypeDeclare_1 = require("../models/TypeDeclare");
const ChapterModel_1 = __importDefault(require("../models/ChapterModel"));
const MangaModel_1 = __importDefault(require("../models/MangaModel"));
async function crawlHtml(url, path) {
    let res = await axios_1.default.get(url);
    let dom = new jsdom_1.JSDOM(res.data, {
        contentType: "text/html",
    }).window.document;
    fs_1.default.writeFileSync(path, res.data);
    return dom;
}
// Loot from https://hocvientruyentranh.net
async function crawlTags() {
    // Try to read data from online
    let url = "https://hocvientruyentranh.net/";
    let path = "./tests/html/index.html";
    let dom;
    if (!fs_1.default.existsSync(path)) {
        dom = await crawlHtml(url, path);
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
            _id: uuid_1.v4(),
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
async function fetchMangaUrl() {
    let url = "https://hocvientruyentranh.net/truyen/all?filter_type=view&page=1";
    let path = ".\\tests\\html\\page1.html";
    let dom;
    if (!fs_1.default.existsSync(path)) {
        dom = await crawlHtml(url, path);
    }
    else {
        let data = fs_1.default.readFileSync(path);
        dom = new jsdom_1.JSDOM(data, {
            contentType: "text/html",
        }).window.document;
    }
    let tableRows = dom.querySelectorAll("tr > td:first-child > a:first-child");
    console.log(`Find ${tableRows.length} mangas`);
    let mangas = [...tableRows].map((val, index) => {
        let manga = {
            title: val.title,
            url: val.href,
        };
        return manga;
    });
    return mangas;
}
/**
 * Crawl chapter data of an manga
 * @param mangaPage Infomation about that manga
 * @param mangaId Its ID in database
 * @param howManyChap default is 10
 * @returns List of Chapter
 */
async function crawlChapters(mangaPage, mangaId, howManyChap = 10) {
    let url = mangaPage.url;
    let path = `./tests/html/${mangaPage.title}.html`;
    let dom;
    if (!fs_1.default.existsSync(path)) {
        dom = await crawlHtml(url, path);
    }
    else {
        let data = fs_1.default.readFileSync(path);
        dom = new jsdom_1.JSDOM(data, {
            contentType: "text/html",
        }).window.document;
    }
    let chapterDiv = dom.querySelector("div.table-scroll");
    let chapterAnchors = chapterDiv?.querySelectorAll("tr > td > a");
    console.log(`${mangaPage.title} has ${chapterAnchors.length} chapters`);
    let chapterNum = howManyChap < chapterAnchors.length && howManyChap > 0
        ? howManyChap
        : chapterAnchors.length;
    let chapters = [];
    let promisedChapters = [];
    for (let i = 0; i < chapterNum; i++) {
        const promise = async () => {
            let chapterAnchor = chapterAnchors.item(chapterAnchors.length - 1 - i);
            // Some time, they don't name a chapter with index
            let chapterIndex;
            try {
                chapterIndex = parseInt(chapterAnchor.title.replace(/^\D+/g, ""));
                if (isNaN(chapterIndex)) {
                    chapterIndex = i + 0.1;
                }
            }
            catch {
                chapterIndex = i + 0.1;
            }
            let chapter = {
                _id: uuid_1.v4(),
                group: "0",
                images: [],
                index: chapterIndex,
                manga: mangaId,
                tittle: mangaPage.title,
                uploader: "0",
                views: 0,
            };
            let chapterPageData = await axios_1.default.get(chapterAnchor.href);
            let chapterDom = new jsdom_1.JSDOM(chapterPageData.data, {
                contentType: "text/html",
            }).window.document;
            let chapterImgs = chapterDom.querySelectorAll(".manga-container img");
            chapter.images = [...chapterImgs].map((img, _) => {
                return img.src;
            });
            console.log(`${mangaPage.title} ${chapterAnchor.title} has ${chapterImgs.length} images`);
            return chapter;
        };
        promisedChapters.push(promise());
        // chapters.push(chapter);
    }
    chapters = await Promise.all(promisedChapters);
    return chapters;
}
/**
 * Crawl manga without chapter data
 * */
async function crawlMangaData(mangaPage) {
    let url = mangaPage.url;
    let path = `./tests/html/${mangaPage.title}.html`;
    let dom;
    if (!fs_1.default.existsSync(path)) {
        dom = await crawlHtml(url, path);
    }
    else {
        let data = fs_1.default.readFileSync(path);
        dom = new jsdom_1.JSDOM(data, {
            contentType: "text/html",
        }).window.document;
    }
    let img = dom.querySelector(".__image img");
    let infoDocument = dom.querySelector(".__info")?.querySelectorAll("p");
    let alterNames, tagsText, authorsText, groupsText, status, briefText;
    infoDocument?.forEach((v, k) => {
        switch (k) {
            case 0: {
                // First child is a list of name with some <strong> tag
                //
                // <p>
                // 	<strong>Tên khác:</strong> Hiệp Sĩ Thánh Chiến , 七つの大罪; Nanatsu
                // 	no Daizai; The Seven Deadly Sins, Thất hình đại tội
                // </p>;
                v.removeChild(v.firstChild);
                alterNames = v.textContent?.split(/;|,/).map((name, idx) => {
                    return name.trim();
                });
                // console.log(alterNames);
                break;
            }
            case 1: {
                // Second is a list of <a> link to tags
                // <a
                // 	href="https://hocvientruyentranh.net/genres/1/action"
                // 	title="Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với  diễn biến nhanh."
                // >
                // 	Action
                // </a>;
                tagsText = [...v.querySelectorAll("a")].map((anchor, _) => {
                    return anchor.innerHTML;
                });
                // console.log(tagsText);
                break;
            }
            case 2: {
                // Third is creators
                authorsText = [...v.querySelectorAll("a")].map((anchor, _) => {
                    return anchor.innerHTML;
                });
                // console.log(authorsText);
                break;
            }
            case 3: {
                // Forth is groups
                groupsText = [...v.querySelectorAll("a")].map((anchor, _) => {
                    return anchor.textContent;
                });
                // console.log(groupsText);
                break;
            }
            case 4: {
                // Fifth is status
                v.removeChild(v.firstChild);
                let statusText = v.textContent?.trim();
                if (statusText === "Đang tiến hành")
                    status = TypeDeclare_1.MangaStatus.OnGoing;
                else if (statusText === "Đã hoàn thành")
                    status = TypeDeclare_1.MangaStatus.Complete;
                else
                    status = TypeDeclare_1.MangaStatus.Dropped;
                // console.log(status);
                break;
            }
            case 5: {
                briefText = v.firstChild?.textContent;
                // console.log(briefText);
                break;
            }
            default:
                break;
        }
    });
    let manga = {
        _id: uuid_1.v4(),
        chapters: [],
        cover: img.src,
        names: [mangaPage.title, ...alterNames],
        tags: tagsText,
        // creators: authorsText!,
        creators: ["0"],
        // groups: [...groupsText!],
        groups: ["0"],
        description: briefText,
        rateNum: 0,
        rating: 0,
        bookmarks: 0,
        views: 0,
        status: TypeDeclare_1.MangaStatus.OnGoing,
        comments: [],
    };
    // manga.chapters = await crawlChapters(mangaPage, manga._id, chapAmount);
    return manga;
}
// DELETE ALL TAGS AND REWRITE AGAIN
// crawlTags().then((res) => {
// 	console.log(res);
// 	tagModel.deleteMany({}).then((_) => {
// 		tagModel.insertMany(res);
// 	});
// });
fetchMangaUrl().then(async (res) => {
    for (let i = 0; i < res.length; i++) {
        let manga = await crawlMangaData(res[i]);
        let chapter = await crawlChapters(res[i], manga._id);
        manga.chapters = chapter.map((val, _) => val._id);
        // await chapterModel.insertMany(chapter);
        // await mangaModel.create(manga);
        await Promise.all([
            ChapterModel_1.default.insertMany(chapter),
            MangaModel_1.default.create(manga),
        ]);
        console.log(`Insert ${manga.names[0]} into DB`);
        console.log(`Insert ${chapter.length} chapters into DB`);
    }
});
