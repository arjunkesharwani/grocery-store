// models/ItemModel.ts

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export interface IItem {
  id: number;
  name: string;
  quantity: number;
}

export const ItemModel = sequelize.define(
  "item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
