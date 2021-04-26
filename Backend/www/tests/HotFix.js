"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
models_1.chapterModel
    .updateMany({}, { uploader: "18127084@student.hcmus.edu.vn" })
    .exec()
    .then((docs) => {
    console.log(`Update ${docs.ok}`);
});
