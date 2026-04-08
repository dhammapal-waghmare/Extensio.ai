import express from "express";
import { generateExtension } from "../controllers/generateController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, generateExtension);

export default router;