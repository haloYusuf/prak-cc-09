import express from "express";
import { getNotes, createNote } from "../controller/NoteController.js";

const router = express.Router();

router.get('/notes', getNotes);
router.post('/tambah-note', createNote);

export default router;