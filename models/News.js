import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const News = sequelize.define("News", {
   // Titles
   title_en: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   title_ru: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   title_uz: {
      type: DataTypes.STRING,
      allowNull: false,
   },

   // Descriptions
   shortDescription_en: {
      type: DataTypes.STRING(500),
      allowNull: false,
   },
   shortDescription_ru: {
      type: DataTypes.STRING(500),
      allowNull: false,
   },
   shortDescription_uz: {
      type: DataTypes.STRING(500),
      allowNull: false,
   },

   // Contents
   content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   content_ru: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   content_uz: {
      type: DataTypes.TEXT,
      allowNull: true,
   },

   // Image
   imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

export default News;
