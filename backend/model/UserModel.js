import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "users"
const User = db.define(
  "user", // Nama Tabel
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refreshToken: Sequelize.TEXT,
  },
  { freezeTableName: true }
);

export default User;
