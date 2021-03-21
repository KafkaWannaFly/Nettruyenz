// Crawl authors data from hocvientruyentranh
import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Creator, CreatorModel } from "../models/CreatorModel";

const pageCount = 180;
const urlTemplate = "https://hocvientruyentranh.net/authors?page=";

async function crawlCreators(url: string) {
	let res = await axios.get(url);
	let dom = new JSDOM(res.data, {
		contentType: "text/html",
	}).window.document;

	let anchorList = dom.querySelectorAll(
		"tr td a"
	) as NodeListOf<HTMLAnchorElement>;

	let authors: Creator[] = [];
	anchorList.forEach((item) => {
		if (item.textContent == "") {
			return;
		} else {
			let author: Creator = {
				name: item.textContent?.trim()!,
			};
			authors.push(author);
		}
	});

	return authors;
}

try {
	let promiseAll: Promise<Creator[]>[] = [];
	for (let i = 1; i <= pageCount; i++) {
		const creatorsPromise = crawlCreators(urlTemplate + i);
		promiseAll.push(creatorsPromise);
	}

	Promise.all(promiseAll).then(async (res) => {
		let authors: Creator[] = [];
		res.forEach((item) => {
			authors = authors.concat(item);
		});

		console.log(`Found ${authors.length} creators`);

		await CreatorModel.insertMany(authors);
		console.log(`Push ${authors.length} creators into DB`);
	});
} catch (error) {
	console.error(error);
}
