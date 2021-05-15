import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
	// id: String,
	name: String,
});

export interface Tag {
	_id?: string;
	id?: string;
	name: string;
}

export interface TagDto extends Tag {}

export function tagDtoOf(data: any): TagDto {
	return {
		name: data.tag,
	};
}

export const tagModel = mongoose.model("tag", tagSchema);
