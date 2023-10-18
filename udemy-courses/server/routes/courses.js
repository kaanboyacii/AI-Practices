import express from "express";
import { loadUdemyCourses, getCoursesByWord, readPDF } from "../controllers/course.js";

const router = express.Router();

// Kursları aranan kelimeye göre getir
router.get("/coursesByWord/:word", getCoursesByWord);
router.get("/readPdf", readPDF);
router.get("/loadUdemyCourses", loadUdemyCourses);

export default router;
