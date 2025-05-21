import db from "../config/Database.js";
import User from "./UserModel.js";
import Compe from "./CompeModel.js";
import Group from "./GroupModel.js";
import GroupMember from "./GroupMemberModel.js";

Group.belongsTo(User, { foreignKey: "uid" });
User.hasMany(Group, { foreignKey: "uid" });

Group.belongsTo(Compe, { foreignKey: "compeId" });
Compe.hasMany(Group, { foreignKey: "compeId" });

GroupMember.belongsTo(Group, { foreignKey: "groupId" });
Group.hasMany(GroupMember, { foreignKey: "groupId" });

GroupMember.belongsTo(User, { foreignKey: "uid" });
User.hasMany(GroupMember, { foreignKey: "uid" });

(async () => {
  try {
    await db.authenticate();
    console.log("Database berhasil terkoneksi!");

    await db.sync({ alter: true });
    console.log("Table Sudah Clear!");
  } catch (err) {
    console.error("Error Ya Allah:", err);
  }
})();

export { User, Group, GroupMember, Compe };
