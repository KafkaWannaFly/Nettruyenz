import { Tag, tagModel } from "../models";

export const tagController = {
	getTagsAsync: async (): Promise<Tag[]> => {
		let tags = await tagModel.find({}).lean().exec();
		return tags.map((tag) => (tag as unknown) as Tag);
	},
};
