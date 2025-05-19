import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const GroupMember = db.define(
  "group_member",
  {
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    groupId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

GroupMember.removeAttribute("id");
GroupMember.primaryKeyAttributes = ["uid", "groupId"];

export default GroupMember;
