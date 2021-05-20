"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const fs_1 = __importDefault(require("fs"));
const ChapterModel_1 = require("../models/ChapterModel");
const MangaModel_1 = require("../models/MangaModel");
const Util_1 = require("./Util");
const models_1 = require("../models");
async function fetchMangaUrl() {
    let url = "https://hocvientruyentranh.net/truyen/all?filter_type=view&page=1";
    let path = ".\\tests\\html\\page1.html";
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
// /**
//  * Crawl chapter data of an manga
//  * @param mangaPage Infomation about that manga
//  * @param mangaId Its ID in database
//  * @param howManyChap default is 10
//  * @returns List of Chapter
//  */
let chapterIdCount = 0;
async function crawlChapters(mangaPage, mangaId, howManyChap = 10) {
    let url = mangaPage.url;
    let path = `./tests/html/${mangaPage.title}.html`;
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
                chapterIndex = parseInt(chapterAnchor.title.replace(/[^0-9.]/g, ""));
                if (isNaN(chapterIndex)) {
                    chapterIndex = i + 0.1;
                }
            }
            catch {
                chapterIndex = i + 0.1;
            }
            let chapter = {
                id: `${mangaId}-${++chapterIdCount}`,
                // group: "0",
                images: [],
                index: chapterIndex,
                manga: mangaId,
                tittle: "",
                uploader: "0",
                // views: 0,
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
// /**
//  * Crawl manga without chapter data
//  * */
let mangaIdCount = 0;
async function crawlMangaData(mangaPage) {
    let url = mangaPage.url;
    let path = `./tests/html/${mangaPage.title?.replace(/\//g, "")}.html`;
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
    let img = dom.querySelector(".__image img");
    let infoDocument = dom.querySelector(".__info")?.querySelectorAll("p");
    let alterNames, tagsText = [], authorsText = [], groupsText, status, briefText;
    let i = 0;
    infoDocument?.forEach((v, k) => {
        switch (i) {
            case 0: {
                // First child is a list of name with some <strong> tag or nothing
                //
                // <p>
                // 	<strong>Tên khác:</strong> Hiệp Sĩ Thánh Chiến , 七つの大罪; Nanatsu
                // 	no Daizai; The Seven Deadly Sins, Thất hình đại tội
                // </p>;
                if (v.firstChild?.textContent !== "Tên khác:") {
                    alterNames = [];
                    i--; // This manga doesn't have alterName field at all so it have less than 1 field that we need
                }
                else {
                    v.removeChild(v.firstChild);
                    alterNames = v.textContent?.split(/;|,/).map((name, idx) => {
                        return name.trim();
                    });
                }
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
                console.log(tagsText);
                break;
            }
            case 2: {
                // Third is creators
                authorsText = [...v.querySelectorAll("a")].map((anchor, _) => {
                    return anchor.innerHTML;
                });
                console.log(authorsText);
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
                    status = MangaModel_1.MangaStatus.OnGoing;
                else if (statusText === "Đã hoàn thành")
                    status = MangaModel_1.MangaStatus.Complete;
                else
                    status = MangaModel_1.MangaStatus.Dropped;
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
        i++;
    });
    let manga = {
        id: Date.now().toString(),
        cover: img.src,
        names: [mangaPage.title, ...alterNames],
        description: briefText,
        status: MangaModel_1.MangaStatus.OnGoing,
    };
    // manga.chapters = await crawlChapters(mangaPage, manga._id, chapAmount);
    const mangaTags = tagsText.map((tagText) => {
        let mangaTag = {
            manga: manga.id,
            tag: tagText,
        };
        return mangaTag;
    });
    const mangaCreators = authorsText.map((author) => {
        let mangaCreator = {
            manga: manga.id,
            creator: author,
        };
        return mangaCreator;
    });
    return { manga, mangaTags, mangaCreators };
}
// DELETE ALL TAGS AND REWRITE AGAIN
// crawlTags().then((res) => {
// 	console.log(res);
// 	tagModel.deleteMany({}).then((_) => {
// 		tagModel.insertMany(res);
// 	});
// });
// CREATE SAMPLE DATA, TOOK LONG TIME TO RUN, BE AWARE!
fetchMangaUrl().then(async (mangaPages) => {
    for (let i = 0; i < mangaPages.length; i++) {
        try {
            let { manga, mangaTags, mangaCreators } = await crawlMangaData(mangaPages[i]);
            let chapter = await crawlChapters(mangaPages[i], manga.id);
            // manga.chapters = chapter.map((val, _) => val._id);
            // await chapterModel.insertMany(chapter);
            // await mangaModel.create(manga);
            await Promise.all([
                MangaModel_1.mangaModel.create(manga),
                ChapterModel_1.chapterModel.insertMany(chapter),
                models_1.mangaTagModel.insertMany(mangaTags),
                models_1.mangaCreatorModel.insertMany(mangaCreators),
            ]);
            console.log(`Insert ${manga.names[0]} into DB`);
            console.log(`Insert ${chapter.length} chapters into DB`);
            console.log(`Insert ${mangaTags.length} mangaTags into DB`);
            console.log(`Insert ${mangaCreators.length} mangaCreators into DB`);
        }
        catch (error) {
            console.error(error);
        }
    }
});
