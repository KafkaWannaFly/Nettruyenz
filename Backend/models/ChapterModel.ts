import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const chapterSchema = new Schema(
	{
		_id: String,
		images: [String],
		manga: String,
		uploader: String,
		views: Number,
		group: String,
		index: Number,
		tittle: String,
	},
	{
		_id: false,
		timestamps: true,
	}
);

const chapterModel = mongoose.model("Chapter", chapterSchema);

export default chapterModel;
