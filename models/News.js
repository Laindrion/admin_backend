import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const News = sequelize.define("News", {
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   shortDescription: {
      type: DataTypes.STRING(500),
      allowNull: false,
   },
   imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   content: {
      type: DataTypes.TEXT,
      allowNull: true
   }
}, {
});

export default News;