import express from "express";
const router = express.Router();
import {userController} from "../controllers/UserController"
const followRouter = router;

router.get("/following-list", async(req, res) => {
    let bookmarksList = userController.getUserFollowedList

    res.json(bookmarksList);
})

export default followRouter;