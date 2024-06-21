import { CartItemModel } from "./cart.model";
import { ItemModel } from "./items.model";
import { PricingModel } from "./pricing.model";

const setupDatabase = async () => {
  await ItemModel.sync();
  await PricingModel.sync();
  await CartItemModel.sync();

  // Seed the PricingTable if necessary
  const items = await ItemModel.findAll();
  if (items.length === 0) {
    await ItemModel.bulkCreate([
      { name: "milk", quantity: 100 },
      { name: "bread", quantity: 100 },
      { name: "banana", quantity: 100 },
      { name: "apple", quantity: 100 },
    ]);
  }
  const pricings = await PricingModel.findAll();
  if (pricings.length === 0) {
    await PricingModel.bulkCreate([
      { itemId: 1, unitPrice: 3.97, saleQuantity: 2, salePrice: 5.0 },
      { itemId: 2, unitPrice: 2.17, saleQuantity: 3, salePrice: 6.0 },
      { itemId: 3, unitPrice: 0.99 },
      { itemId: 4, unitPrice: 0.89 },
    ]);
  }
};

export { setupDatabase };
