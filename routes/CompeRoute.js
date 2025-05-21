import express from "express";
import multer from "multer";
import {
  getAllCompe,
  getCompeById,
  createCompe,
  editCompe,
  updateStatusCompe,
  deleteCompe,
} from "../controller/CompeController.js";

const compeRouter = express.Router();
const upload = multer({ dest: "uploads/" });

compeRouter.get("/", getAllCompe);
compeRouter.get("/:compeId", getCompeById);
compeRouter.post("/", upload.single("image"), createCompe);
compeRouter.put("/:compeId", upload.single("image"), editCompe);
compeRouter.patch("/:compeId/status", updateStatusCompe);
compeRouter.delete("/:compeId", deleteCompe);

export default compeRouter;
