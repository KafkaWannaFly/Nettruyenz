import { chapterModel } from "../models";

chapterModel
	.updateMany({}, { uploader: "18127084@student.hcmus.edu.vn" })
	.exec()
	.then((docs) => {
		console.log(`Update ${docs.ok}`);
	});
