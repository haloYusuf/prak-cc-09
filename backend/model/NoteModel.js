import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const Note = db.define(
  "content",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    content: Sequelize.STRING,
    is_finish: Sequelize.INTEGER,
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
