import express from "express";
import { getCoursesByWord, readPDF } from "../controllers/course.js";

const router = express.Router();

// Kursları aranan kelimeye göre getir
router.get("/coursesByWord/:word", getCoursesByWord);
router.get("/readPdf", readPDF);

export default router;
