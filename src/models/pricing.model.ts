// models/PricingModel.ts

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ItemModel } from "./items.model";

export interface IPricing {
  id: number;
  itemId: number;
  unitPrice: number;
  saleQuantity?: number;
  salePrice?: number;
}
export const PricingModel = sequelize.define(
  "pricing",
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
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    saleQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

ItemModel.hasOne(PricingModel, { foreignKey: "itemId" });
PricingModel.belongsTo(ItemModel, { foreignKey: "itemId" });
