import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/NoteController.js";
import {
  login,
  createUser,
  refreshToken,
  logout,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// User Routes
router.post("/register", createUser);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

router.get("/notes", verifyToken, getNotes);
router.post("/tambah-note", verifyToken, createNote);
router.put("/update-note/:id", verifyToken, updateNote);
router.delete("/delete-note/:id", verifyToken, deleteNote);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Tolong pilih service." });
});

export default router;
