import express from "express";
import { tagController } from "../controllers/TagController";
import { TagDto } from "../models";

const route = express.Router();

route.get("/", async (req, res) => {
	let tags: TagDto[] = (await tagController.getTagsAsync()).map((tag) => {
		return {
			// id: tag._id,
			name: tag.name,
		};
	});

	res.json(tags);
});

const tagRoute = route;
export default tagRoute;
