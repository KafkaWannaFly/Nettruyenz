import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";

import { Tag } from "../models/TypeDeclare";
import tagModel from "../models/TagModel";

interface ExtendedTag extends Tag {
	url?: string;
}

// Loot from https://hocvientruyentranh.net
async function crawlTags(): Promise<Tag[]> {
	// Try to read data from online
	let path = "./tests/index.html";
	let dom;

	if (!fs.existsSync(path)) {
		let res = await axios.get("https://hocvientruyentranh.net/");
		dom = new JSDOM(res.data, {
			contentType: "text/html",
		}).window.document;

		fs.writeFileSync(path, res.data);
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
			id: "",
			name: val.querySelector("a")?.innerHTML!!,
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

// DELETE ALL TAGS AND REWRITE AGAIN
crawlTags().then((res) => {
	console.log(res);

	tagModel.deleteMany({}).then((_) => {
		tagModel.insertMany(res);
	});
});
