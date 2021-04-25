import fs from "fs";
import { JSDOM } from "jsdom";
import { v4 as uuidv4 } from "uuid";
import { Tag, tagModel } from "../models/TagModel";
import { crawlHtml } from "./Util";

interface ExtendedTag extends Tag {
	url?: string;
}

// Loot from https://hocvientruyentranh.net
async function crawlTags(): Promise<ExtendedTag[]> {
	// Try to read data from online
	let url = "https://hocvientruyentranh.net/";
	let path = "./tests/html/index.html";
	let dom;

	if (!fs.existsSync(path)) {
		dom = await crawlHtml(url, path);
	} else {
		let data = fs.readFileSync(path);
		dom = new JSDOM(data, {
			contentType: "text/html",
		}).window.document;
	}

	let cateListItems = dom?.querySelector(".submenu")?.children;
	console.log(`submenu children number: ${cateListItems?.length}`);
	let liArray = cateListItems ? [...cateListItems] : [];

	let tagItems = liArray.slice(10);

	let tags: ExtendedTag[] = tagItems.flatMap((val, index) => {
		let tag: ExtendedTag = {
			id: uuidv4(),
			name: val.querySelector("a")?.innerHTML.trim()!!,
			url: val.querySelector("a")?.href,
		};

		// Filter out those unwanted tags
		if (
			tag.name.match("Truyện") ||
			tag.name.match("Webtoon") ||
			tag.name.match("Trưởng") ||
			tag.name.match("Truyền") ||
			tag.name.match("Doujinshi")
		) {
			return [];
		}
		return tag;
	});

	return tags;
}

crawlTags().then(async (tags) => {
	tags.forEach(async (tag) => {
		await tagModel.updateOne({ name: tag.name }, tag, { upsert: true }).exec();
	});
	console.log(`Create ${tags.length} tags`);
});
