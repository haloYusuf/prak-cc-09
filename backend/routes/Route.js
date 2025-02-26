import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controller/NoteController.js";

const router = express.Router();

router.get('/notes', getNotes);
router.post('/tambah-note', createNote);
router.put('/update-note/:id', updateNote);
router.delete('/delete-note/:id', deleteNote);

export default router;