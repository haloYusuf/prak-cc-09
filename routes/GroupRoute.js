import express from "express";
import multer from "multer";
import {
  createGroup,
  editGroup,
  deleteGroup,
  getAllGroupMembers,
  getJoinedGroupsByUserId,
} from "../controller/GroupController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isRegularUser } from "../middleware/authorizeRole.js";

const groupRouter = express.Router();
const upload = multer({ dest: "uploads/" });

groupRouter.post("/", verifyToken, isRegularUser, upload.single("image"), createGroup);
groupRouter.put("/:groupId", verifyToken, isRegularUser, upload.single("image"), editGroup);
groupRouter.delete("/:groupId", verifyToken, isRegularUser, deleteGroup);

groupRouter.get("/all/:userId", verifyToken, isRegularUser, getJoinedGroupsByUserId);
groupRouter.get("/members/:groupId", verifyToken, getAllGroupMembers);

export default groupRouter;
