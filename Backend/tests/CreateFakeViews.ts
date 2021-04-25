import { random } from "faker";
import { Chapter, chapterModel } from "../models/ChapterModel";
import {
	MangaChapterView,
	mangaChapterViewModel,
} from "../models/MangaChapterViewModel";

async function createFakeViews() {
	let chaptersDoc = await chapterModel.find({}).lean().exec();
	let chapters = chaptersDoc.map((v, i) => {
		return v as Chapter;
	});
	console.log(`Found ${chapters.length} chapters`);

	for (let i = 0; i < chapters.length; i++) {
		let viewCount = random.number(100);
		// chapters[i].views = viewCount;

		let views: MangaChapterView[] = [];
		for (let count = 0; count < viewCount; count++) {
			let view: MangaChapterView = {
				chapter: chapters[i].id!,
				manga: chapters[i].manga!,
			};

			views.push(view);
		}
		await mangaChapterViewModel.insertMany(views);
		await chapterModel
			.findOneAndUpdate(
				{ id: chapters[i].id },
				{ views: viewCount },
				{ new: true, useFindAndModify: false }
			)
			.exec();
		console.log(`${i}. Create ${views.length} views!`);
	}

	console.log(`Updated ${chapters.length} chapters`);
}

createFakeViews()
	.then(() => {
		console.log(`Done!`);
	})
	.catch((err) => {
		console.error(err);
	});
