import TagModel from "../models/TagModel";
import { Tag } from "../models/TypeDeclare";

// TagModel.create(tag);

TagModel.findOne({ name: "Comedy" }).then((doc) => {
	let tag = (doc as unknown) as Tag;
	console.log(tag.id);
});

export {};
