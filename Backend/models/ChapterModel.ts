import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const chapterSchema = new Schema(
	{
		images: [String],
		manga: Id,
		uploader: Id,
		views: Number,
		group: Id,
		index: Number,
		tittle: String,
	},
	{
		timestamps: true,
	}
);

const chapterModel = mongoose.model("Chapter", chapterSchema);

export default chapterModel;
