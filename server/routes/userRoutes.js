import express from "express";
import {
  registerUser,
  loginUser,
  profileDetails,
  updateProfileDetails,
} from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, profileDetails);
router.put("/profile", authenticateUser, updateProfileDetails);

export default router;
