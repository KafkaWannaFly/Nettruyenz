import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Chapter, chapterModel } from "../models/ChapterModel";
import { Tag } from "../models/TagModel";
import { Manga, mangaModel, MangaStatus } from "../models/MangaModel";
import { crawlHtml } from "./Util";
import {
	MangaCreator,
	mangaCreatorModel,
	MangaTag,
	mangaTagModel,
} from "../models";

interface IMangaPage {
	title?: string;
	url?: string;
}

async function fetchMangaUrl() {
	let url = "https://hocvientruyentranh.net/truyen/all?filter_type=view&page=1";
	let path = ".\\tests\\html\\page1.html";
	let dom;

	if (!fs.existsSync(path)) {
		dom = await crawlHtml(url, path);
	} else {
		let data = fs.readFileSync(path);
		dom = new JSDOM(data, {
			contentType: "text/html",
		}).window.document;
	}

	let tableRows = dom.querySelectorAll(
		"tr > td:first-child > a:first-child"
	) as NodeListOf<HTMLAnchorElement>;
	console.log(`Find ${tableRows.length} mangas`);
	let mangas: IMangaPage[] = [...tableRows].map((val, index) => {
		let manga: IMangaPage = {
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
async function crawlChapters(
	mangaPage: IMangaPage,
	mangaId: string,
	howManyChap = 10
) {
	let url = mangaPage.url!;
	let path = `./tests/html/${mangaPage.title}.html`;
	let dom;

	if (!fs.existsSync(path)) {
		dom = await crawlHtml(url, path);
	} else {
		let data = fs.readFileSync(path);
		dom = new JSDOM(data, {
			contentType: "text/html",
		}).window.document;
	}

	let chapterDiv = dom.querySelector("div.table-scroll");
	let chapterAnchors = chapterDiv?.querySelectorAll(
		"tr > td > a"
	) as NodeListOf<HTMLAnchorElement>;

	console.log(`${mangaPage.title} has ${chapterAnchors.length} chapters`);

	let chapterNum =
		howManyChap < chapterAnchors.length && howManyChap > 0
			? howManyChap
			: chapterAnchors.length;
	let chapters: Chapter[] = [];

	let promisedChapters: Promise<Chapter>[] = [];

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
			} catch {
				chapterIndex = i + 0.1;
			}

			let chapter: Chapter = {
				id: `${mangaId}-${++chapterIdCount}`,
				// group: "0",
				images: [],
				index: chapterIndex,
				manga: mangaId,
				tittle: "",
				uploader: "0",
				// views: 0,
			};

			let chapterPageData = await axios.get(chapterAnchor.href);
			let chapterDom = new JSDOM(chapterPageData.data, {
				contentType: "text/html",
			}).window.document;

			let chapterImgs = chapterDom.querySelectorAll(
				".manga-container img"
			) as NodeListOf<HTMLImageElement>;
			chapter.images = [...chapterImgs].map((img, _) => {
				return img.src;
			});

			console.log(
				`${mangaPage.title} ${chapterAnchor.title} has ${chapterImgs.length} images`
			);

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
async function crawlMangaData(mangaPage: IMangaPage) {
	let url = mangaPage.url!;
	let path = `./tests/html/${mangaPage.title?.replace(/\//g, "")}.html`;
	let dom;

	if (!fs.existsSync(path)) {
		dom = await crawlHtml(url, path);
	} else {
		let data = fs.readFileSync(path);
		dom = new JSDOM(data, {
			contentType: "text/html",
		}).window.document;
	}

	let img = dom.querySelector(".__image img") as HTMLImageElement;

	let infoDocument = dom.querySelector(".__info")?.querySelectorAll("p");
	let alterNames: string[],
		tagsText: string[] = [],
		authorsText: string[] = [],
		groupsText: string[],
		status: MangaStatus,
		briefText: string;

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
				} else {
					v.removeChild(v.firstChild!);

					alterNames = v.textContent?.split(/;|,/).map((name, idx) => {
						return name.trim();
					})!;
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
					return anchor.textContent!;
				});
				// console.log(groupsText);
				break;
			}
			case 4: {
				// Fifth is status
				v.removeChild(v.firstChild!);
				let statusText = v.textContent?.trim()!;

				if (statusText === "Đang tiến hành") status = MangaStatus.OnGoing;
				else if (statusText === "Đã hoàn thành") status = MangaStatus.Complete;
				else status = MangaStatus.Dropped;

				// console.log(status);
				break;
			}
			case 5: {
				briefText = v.firstChild?.textContent!;
				// console.log(briefText);
				break;
			}
			default:
				break;
		}

		i++;
	});

	let manga: Manga = {
		id: Date.now().toString(),
		cover: img.src,
		names: [mangaPage.title!, ...alterNames!],
		description: briefText!,
		status: MangaStatus.OnGoing,
	};

	// manga.chapters = await crawlChapters(mangaPage, manga._id, chapAmount);

	const mangaTags = tagsText.map((tagText) => {
		let mangaTag: MangaTag = {
			manga: manga.id,
			tag: tagText,
		};

		return mangaTag;
	});

	const mangaCreators = authorsText.map((author) => {
		let mangaCreator: MangaCreator = {
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
			let { manga, mangaTags, mangaCreators } = await crawlMangaData(
				mangaPages[i]
			);
			let chapter = await crawlChapters(mangaPages[i], manga.id);

			// manga.chapters = chapter.map((val, _) => val._id);

			// await chapterModel.insertMany(chapter);
			// await mangaModel.create(manga);

			await Promise.all([
				mangaModel.create(manga),
				chapterModel.insertMany(chapter),
				mangaTagModel.insertMany(mangaTags),
				mangaCreatorModel.insertMany(mangaCreators),
			]);

			console.log(`Insert ${manga.names[0]} into DB`);
			console.log(`Insert ${chapter.length} chapters into DB`);
			console.log(`Insert ${mangaTags.length} mangaTags into DB`);
			console.log(`Insert ${mangaCreators.length} mangaCreators into DB`);
		} catch (error) {
			console.error(error);
		}
	}
});
