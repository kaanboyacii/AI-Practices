import express from "express";
import { extractSkills, getCoursesByWord, readPDF } from "../controllers/course.js";

const router = express.Router();

// Kursları aranan kelimeye göre getir
router.get("/coursesByWord/:word", getCoursesByWord);
router.get("/readPdf", readPDF);
router.get("/extractSkills", extractSkills);

export default router;
