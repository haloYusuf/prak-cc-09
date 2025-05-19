import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const Group = db.define(
  "group",
  {
    groupId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    compeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxMember: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default Group;
