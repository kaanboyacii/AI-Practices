import express from "express";
import { getCoursesByWord } from "../controllers/course.js";

const router = express.Router();

// Kursları aranan kelimeye göre getir
router.get("/coursesByWord/:word", getCoursesByWord);

export default router;
