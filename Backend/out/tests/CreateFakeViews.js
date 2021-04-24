"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("faker");
const ChapterModel_1 = require("../models/ChapterModel");
const ViewModel_1 = require("../models/ViewModel");
async function createFakeViews() {
    let chaptersDoc = await ChapterModel_1.ChapterModel.find({}).lean().exec();
    let chapters = chaptersDoc.map((v, i) => {
        return v;
    });
    console.log(`Found ${chapters.length} chapters`);
    for (let i = 0; i < chapters.length; i++) {
        let viewCount = faker_1.random.number(100);
        chapters[i].views = viewCount;
        let views = [];
        for (let count = 0; count < viewCount; count++) {
            let view = {
                chapter: chapters[i].id,
                manga: chapters[i].manga,
            };
            views.push(view);
        }
        await ViewModel_1.ViewModel.insertMany(views);
        await ChapterModel_1.ChapterModel.findOneAndUpdate({ id: chapters[i].id }, { views: viewCount }, { new: true, useFindAndModify: false }).exec();
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
//# sourceMappingURL=CreateFakeViews.js.map