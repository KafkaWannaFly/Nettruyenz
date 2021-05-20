import express from "express";
import passport from "passport";
import { commentController } from "../controllers/CommentController";
import { User, UserComment } from "../models";

const router = express.Router();

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = req.user as User;

		const comment = req.body.comment as UserComment;
		comment.email = user.email;

		const cmt = await commentController.saveComment(comment);
		console.log(`Save comment: ${JSON.stringify(cmt, null, 4)}`);
		res.json({ message: "Success!" });
	}
);

const commentRoute = router;
export default commentRoute;
