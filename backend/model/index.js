import db from "../config/Database.js";
import User from "./UserModel.js";
import Note from "./NoteModel.js";

User.hasMany(Note, { foreignKey: "uId", onDelete: "CASCADE" });
Note.belongsTo(User, { foreignKey: "uId" });

(async () => {
  try {
    await db.authenticate();
    console.log("Database berhasil terkoneksi!");

    await db.sync({ alter: true });
    console.log("Table Aman!");
  } catch (err) {
    console.error("Error Bjirr:", err);
  }
})();

export { User, Note };