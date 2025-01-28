import express from "express";
import {
  registerUser,
  loginUser,
  profileDetails,
} from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, profileDetails);

export default router;
