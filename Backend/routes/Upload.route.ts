import express from "express";
import passport, { authenticate } from "passport";
import {
	API_KEY,
	API_SECRET,
	UPLOAD_URL,
} from "../constants/EnvironmentConstants";
import { chapterController } from "../controllers/ChapterController";
import { mangaController } from "../controllers/MangaController";
import { adminUser } from "../middlewares/AdminUser";
import { ChapterDto, MangaDto, User, UserLevel } from "../models";
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
		const mangaDto = req.body.mangaDto as MangaDto;

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

		const manga = await mangaController.getCompletedMangaDtoByIdAsync(
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
		const mangaDto = req.body.mangaDto as MangaDto;

		const chapterDto = mangaDto.chapterDto;
		chapterDto.uploader = user.email;

		await Promise.all([
			mangaController.saveMangaAsync(mangaDto),
			chapterController.saveChapterAsync(chapterDto),
		]);

		res.status(204).json({ message: "Success" });
	}
);

router.post(
	"/chapter",
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const chapterDto = req.body.chapterDto as ChapterDto;

			let error = "";
			if (!chapterDto) {
				error = "Chapter is undefined";
			}

			const chapter = await chapterController.getChapterById(chapterDto.id);
			if (chapter) {
				error = "Chapter id has already existed";
			}

			const manga = await mangaController.getMangaByIdAsync(chapterDto.manga);
			if (!manga) {
				error = "Manga id not exiested";
			}

			if (chapterDto.images.length <= 0) {
				error = "Empty images";
			}

			if (error != "") {
				return res.status(400).json({ error });
			}

			next();
		} catch (error) {
			return res.status(400).json({ error });
		}
	},
	async (req: express.Request, res: express.Response) => {
		const chapterDto = req.body.chapterDto as ChapterDto;

		await chapterController.saveChapterAsync(chapterDto);

		res.status(204).json({ message: "Success" });
	}
);

const uploadRoute = router;
export default uploadRoute;
