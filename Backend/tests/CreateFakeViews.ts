import { random } from "faker";
import { Chapter, ChapterModel } from "../models/ChapterModel";
import { MangaChapterView, ViewModel } from "../models/ViewModel";

async function createFakeViews() {
	let chaptersDoc = await ChapterModel.find({}).lean().exec();
	let chapters = chaptersDoc.map((v, i) => {
		return v as Chapter;
	});
	console.log(`Found ${chapters.length} chapters`);

	for (let i = 0; i < chapters.length; i++) {
		let viewCount = random.number(100);
		chapters[i].views = viewCount;

		let views: MangaChapterView[] = [];
		for (let count = 0; count < viewCount; count++) {
			let view: MangaChapterView = {
				chapter: chapters[i].id,
				manga: chapters[i].manga,
			};

			views.push(view);
		}
		await ViewModel.insertMany(views);
		await ChapterModel.findOneAndUpdate(
			{ id: chapters[i].id },
			{ views: viewCount },
			{ new: true, useFindAndModify: false }
		).exec();
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
