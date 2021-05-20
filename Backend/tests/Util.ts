import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
import {
	bookmarkModel,
	chapterModel,
	creatorModel,
	mangaModel,
	User,
	userModel,
} from "../models";
export function shuffle(array: any[]) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
export async function crawlHtml(url: string, path: string) {
	let res = await axios.get(url);
	let dom = new JSDOM(res.data, {
		contentType: "text/html",
	}).window.document;

	fs.writeFileSync(path, res.data);

	return dom;
}

export async function getRandomUser() {
	const agg = [{ $sample: { size: 1 } }];

	let user = (await userModel.aggregate(agg).exec())[0] as User;

	return user;
}
