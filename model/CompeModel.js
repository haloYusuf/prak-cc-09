import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const Compe = db.define(
  "compe",
  {
    compeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    compeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compeDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compeImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compeDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    compeStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]], // 0 => Open, 1 => Closed / Started / Finished
      },
    },
    maxParticipant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default Compe;
