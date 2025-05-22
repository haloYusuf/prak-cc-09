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
    groupStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0 => Pending
      validate: {
        isIn: [[-1, 0, 1]], // -1 => Rejected, 0 => Pending, 1 => Accepted
      },
    },
    rejectedMessage: {
      type: DataTypes.TEXT, // Menggunakan TEXT untuk pesan yang mungkin panjang
      allowNull: true, // Pesan hanya ada jika ditolak, jadi bisa NULL
      defaultValue: null,
    },
  },
  { freezeTableName: true }
);

export default Group;
