import express from "express";
import passport, { authenticate } from "passport";
import {
	API_KEY,
	API_SECRET,
	UPLOAD_URL,
} from "../constants/EnvironmentConstants";
import { chapterController } from "../controllers/ChapterController";
import { MangaController } from "../controllers/MangaController";
import { adminUser } from "../middlewares/AdminUser";
import { MangaDto, User, UserLevel } from "../models";
import cloudinaryService from "../services/CloudinaryService";

const router = express.Router();

router.use(adminUser());

router.get(
	"/signature",
	async (req: express.Request, res: express.Response) => {
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

router.post(
	"/manga",
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const mangaDto = req.body.manga as MangaDto;

		let error = "";

		if (!mangaDto || !mangaDto.chapterDto) {
			error = "Empty mangaDto or chapterDto";
		}

		if (!mangaDto.id) {
			error = "Undefined manga id";
		}

		if (!mangaDto.chapterDto.id) {
			error = "Undefined chapter id";
		}

		if (mangaDto.id != mangaDto.chapterDto.manga) {
			error = "Chapter not belong to manga";
		}

		const chapter = await chapterController.getChapterById(
			mangaDto.chapterDto.id
		);
		if (chapter) {
			error = "Chapter id has already existed";
		}

		const manga = await MangaController.getCompletedMangaDtoByIdAsync(
			mangaDto.id
		);
		if (manga) {
			error = "Manga id has already existed";
		}

		if (error != "") {
			return res.status(400).json({ error });
		}

		next();
	},
	async (req: express.Request, res: express.Response) => {
		const user = req.user as User;
		const mangaDto = req.body.manga as MangaDto;

		const chapterDto = mangaDto.chapterDto;
		chapterDto.uploader = user.email;

		await Promise.all([
			MangaController.saveMangaAsync(mangaDto),
			chapterController.saveChapterAsync(chapterDto),
		]);
	}
);

router.post(
	"/chapter",
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {}
);

const uploadRoute = router;
export default uploadRoute;
