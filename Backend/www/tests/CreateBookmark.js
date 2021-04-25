"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
const faker_1 = require("faker");
const models_1 = require("../models");
const BookmarkModel_1 = require("../models/BookmarkModel");
const UserModel_1 = require("../models/UserModel");
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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
exports.shuffle = shuffle;
async function createFakeBookmarks() {
    let users = (await UserModel_1.userModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    let mangas = (await models_1.mangaModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    users.forEach(async (user, index) => {
        let mangaNum = faker_1.random.number(mangas.length);
        mangas = shuffle(mangas);
        let bookmarks = [];
        for (let i = 0; i < mangaNum; i++) {
            let bookmark = {
                manga: mangas[i].id,
                email: user.email,
            };
            bookmarks.push(bookmark);
        }
        await BookmarkModel_1.bookmarkModel.insertMany(bookmarks);
        console.log(`${user.nickname} has followed ${bookmarks.length} mangas`);
    });
}
createFakeBookmarks().then(() => {
    console.log(`Done!`);
});
