import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const Id = Schema.Types.ObjectId;

const mangaSchema = new Schema({
	names: [String],
	cover: String,
	creators: [Id],
	tags: [Id],
	rating: Number,
	rateNum: Number,
	bookmarks: Number,
	views: Number,
	status: Number,
	groups: [Id],
	description: String,
	chapters: [Id],
	comments: [Id],
});

const mangaModel = mongoose.model("Manga", mangaSchema);

export default mangaModel;
