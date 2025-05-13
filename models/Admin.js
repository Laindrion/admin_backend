import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Admin = sequelize.define("Admin", {
   username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   }
}, {
   timestamps: false,
})

export default Admin;   