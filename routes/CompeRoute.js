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
} from "../controller/CompeController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/authorizeRole.js";

const compeRouter = express.Router();
const upload = multer({ dest: "uploads/" });

compeRouter.get("/", verifyToken, isAdmin, getAllCompe);
compeRouter.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createCompe
);

compeRouter.get("/:compeId", verifyToken, isAdmin, getCompeById);
compeRouter.delete("/:compeId", verifyToken, isAdmin, deleteCompe);
compeRouter.put(
  "/:compeId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  editCompe
);

compeRouter.patch("/status/:compeId", updateStatusCompe);

compeRouter.get("/group/:compeId", verifyToken, isAdmin, getAllGroupByCompe);
compeRouter.put("/group/approve/:grouId", verifyToken, isAdmin, approveGroup);
compeRouter.put("/group/reject/:grouId", verifyToken, isAdmin, rejectGroup);

export default compeRouter;
