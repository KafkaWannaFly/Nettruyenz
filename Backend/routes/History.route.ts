import express from "express";
import {userController} from "../controllers/UserController"
const router = express.Router();

router.get("/reading-history", async(req, res) => {
    let historyList = userController.getUserReadingHistory;
    res.json(historyList);
});

const historyRouter = router;

export default historyRouter;