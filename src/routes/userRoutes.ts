import express from "express";
import controller from "../controllers/userController";
const router = express.Router();

router.get("/", controller.getAllUsers);
router.get("/one", controller.getUser);
router.post("/", controller.createUser);
router.put("/", controller.updateUser);

module.exports = router;
