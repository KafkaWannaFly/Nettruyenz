"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("faker");
const ChapterModel_1 = require("../models/ChapterModel");
const MangaChapterViewModel_1 = require("../models/MangaChapterViewModel");
const Util_1 = require("./Util");
async function createFakeViews() {
    let chaptersDoc = await ChapterModel_1.chapterModel.find({}).lean().exec();
    let chapters = chaptersDoc.map((v, i) => {
        return v;
    });
    console.log(`Found ${chapters.length} chapters`);
    for (let i = 0; i < chapters.length; i++) {
        let viewCount = faker_1.random.number(25);
        let views = [];
        let user = await Util_1.getRandomUser();
        for (let count = 0; count < viewCount; count++) {
            let view = {
                chapter: chapters[i].id,
                manga: chapters[i].manga,
                email: user.email,
            };
            views.push(view);
        }
        await MangaChapterViewModel_1.mangaChapterViewModel.insertMany(views);
        await ChapterModel_1.chapterModel
            .findOneAndUpdate({ id: chapters[i].id }, { views: viewCount }, { new: true, useFindAndModify: false })
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
