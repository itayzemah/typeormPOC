import express from "express";
import controller from "../controllers/tweetController";
const router = express.Router();

router.get("/", controller.getAllTweets);
router.get("/one", controller.getTweet);
router.get("/by/user", controller.getTweetsByUser);
router.post("/", controller.createTweet);
router.put("/", controller.updateTweet);

module.exports = router;
