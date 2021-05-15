import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
	name: String,
});

export interface Creator {
	id?: string;
	name: string;
}

export interface CreatorDto extends Creator {
	mangas?: string[];
}

export const creatorModel = mongoose.model("creator", creatorSchema);

export function creatorOf(data: any): Creator {
	return {
		name: data.creator,
	};
}
