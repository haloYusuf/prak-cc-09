import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";
import { v4 as uuidv4 } from "uuid";

const User = db.define(
  "user",
  {
    uid: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(), // Generate uuid
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]], // 0 => Default User, 1 => Admin
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9+]+$/i, // opsional: validasi hanya angka dan "+"
      },
    },
    refreshToken: Sequelize.TEXT,
  },
  { freezeTableName: true }
);

export default User;
