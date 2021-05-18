import express from "express";
import passport, { authenticate } from "passport";
import {
	API_KEY,
	API_SECRET,
	UPLOAD_URL,
} from "../constants/EnvironmentConstants";
import { User, UserLevel } from "../models";
import cloudinaryService from "../services/CloudinaryService";

const router = express.Router();

router.get(
	"/signature",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		const user = req.user as User;
		if (user.level !== UserLevel.moderator) {
			res.status(401);
		}

		next();
	},
	async (req, res) => {
		const uploadUrl = UPLOAD_URL;
		const apiKey = API_KEY;
		const timestamp = Date.now();
		const signature = cloudinaryService.utils.api_sign_request(
			{
				timestamp: Date.now(),
			},
			API_SECRET
		);

		res.json({ uploadUrl, apiKey, timestamp, signature });
	}
);

const uploadRoute = router;
export default uploadRoute;
