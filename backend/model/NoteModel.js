import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Note = db.define(
  "content",
  {
    user: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    content: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    //timestamps: false,
    createdAt: "tanggal_dibuat",
    updatedAt: "Tanggal_diupdate",
  }
);

export default Note;

(async () => {
  await db.sync();
})();
