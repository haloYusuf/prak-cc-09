import express from "express";
import multer from "multer";
import {
  getAllCompe,
  getCompeById,
  createCompe,
  editCompe,
  updateStatusCompe,
  deleteCompe,
  getAllGroupByCompe,
  approveGroup,
  rejectGroup,
  getLatestOpenCompetitions,
  getAllOpenCompetitions,
} from "../controller/CompeController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/authorizeRole.js";

const compeRouter = express.Router();
const upload = multer({ dest: "uploads/" });

compeRouter.get("/", verifyToken, isAdmin, getAllCompe);
compeRouter.get("/open/latest/", verifyToken, getLatestOpenCompetitions);
compeRouter.get("/open/", verifyToken, getAllOpenCompetitions);
compeRouter.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createCompe
);

compeRouter.get("/:compeId", verifyToken, getCompeById);
compeRouter.delete("/:compeId", verifyToken, isAdmin, deleteCompe);
compeRouter.put(
  "/:compeId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  editCompe
);

compeRouter.patch("/status/:compeId", verifyToken, isAdmin, updateStatusCompe);

compeRouter.get("/group/:compeId", verifyToken, isAdmin, getAllGroupByCompe);
compeRouter.put("/group/approve/", verifyToken, isAdmin, approveGroup);
compeRouter.put("/group/reject/", verifyToken, isAdmin, rejectGroup);

export default compeRouter;
