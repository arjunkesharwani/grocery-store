// models/CartItemModel.ts

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { IItem, ItemModel } from "./items.model";

export interface ICart {
  id: number;
  itemId: number;
  quantity: number;
  item?: IItem;
}

export const CartItemModel = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ItemModel,
        key: "id",
      },
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

ItemModel.hasMany(CartItemModel, { foreignKey: "itemId" });
CartItemModel.belongsTo(ItemModel, { foreignKey: "itemId" });
