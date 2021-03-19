import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const userSchema = new Schema(
	{
		username: String,
		password: String,
		nickname: String,
		avatar: String,
		level: Number,
		groups: [Id],
		bookmarks: [Id],
		history: [Id],
		notifications: [Id],
		ratesMade: [Id],
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
