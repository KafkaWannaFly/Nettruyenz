import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const Id = Schema.Types.ObjectId;

const mangaSchema = new Schema(
	{
		_id: String,
		names: [String],
		cover: String,
		creators: [String],
		tags: [String],
		rating: Number,
		rateNum: Number,
		bookmarks: Number,
		views: Number,
		status: Number,
		groups: [String],
		description: String,
		chapters: [String],
		comments: [String],
	},
	{
		_id: false,
		timestamps: true,
	}
);

const mangaModel = mongoose.model("Manga", mangaSchema);

export default mangaModel;
