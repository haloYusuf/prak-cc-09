import express from "express";
import {
  createNewMember,
  removeMemberFromGroup,
} from "../controller/GroupMemberController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isRegularUser } from "../middleware/authorizeRole.js";

const groupMemberRouter = express.Router();

groupMemberRouter.post(
  "/:groupId",
  verifyToken,
  isRegularUser,
  createNewMember
);
groupMemberRouter.delete(
  "/:groupId",
  verifyToken,
  isRegularUser,
  removeMemberFromGroup
);

export default groupMemberRouter;