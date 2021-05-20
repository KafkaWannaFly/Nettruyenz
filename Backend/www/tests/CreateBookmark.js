"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("faker");
const models_1 = require("../models");
const BookmarkModel_1 = require("../models/BookmarkModel");
const UserModel_1 = require("../models/UserModel");
const Util_1 = require("./Util");
async function createFakeBookmarks() {
    let users = (await UserModel_1.userModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    let mangas = (await models_1.mangaModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    users.forEach(async (user, index) => {
        let mangaNum = faker_1.random.number(mangas.length / 2);
        mangas = Util_1.shuffle(mangas);
        let bookmarks = [];
        for (let i = 0; i < mangaNum; i++) {
            let bookmark = {
                manga: mangas[i].id,
                email: user.email,
            };
            bookmarks.push(bookmark);
        }
        await BookmarkModel_1.bookmarkModel.insertMany(bookmarks);
        console.log(`${user.email} has followed ${bookmarks.length} mangas`);
    });
}
createFakeBookmarks().then(() => {
    console.log(`Done!`);
});
