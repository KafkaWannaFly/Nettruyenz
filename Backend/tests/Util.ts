import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";

export async function crawlHtml(url: string, path: string) {
	let res = await axios.get(url);
	let dom = new JSDOM(res.data, {
		contentType: "text/html",
	}).window.document;

	fs.writeFileSync(path, res.data);

	return dom;
}
