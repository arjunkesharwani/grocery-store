import { CartItemModel, ICart } from "../models/cart.model";
import { ItemModel } from "../models/items.model";
import { PricingModel } from "../models/pricing.model";
import PricingService from "./pricing.service";

export class CartService {
  async addItem(itemName: string): Promise<void> {
    try {
      const result = await PricingService.getItemPricing(itemName);
      if (result) {
        const { item } = result;
        let cartItem: any = await CartItemModel.findOne({
          where: { itemId: item.id },
        });
        if (cartItem) {
          cartItem.quantity++;
          await cartItem.save();
        } else {
          await CartItemModel.create({
            itemId: item.id,
            quantity: 1,
          });
        }
      } else {
        console.log(`Item '${itemName}' not found.`);
      }
    } catch (error) {
      console.error(`Error adding item '${itemName}' to cart:`, error);
    }
  }

  async getCartItems() {
    try {
      return await CartItemModel.findAll({
        include: [{ model: ItemModel }],
      });
    } catch (error) {
      throw error;
    }
  }

  async clearCart(): Promise<void> {
    try {
      await CartItemModel.destroy({ truncate: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  calculateItemPrice(quantity: number, priceDetails: any): number {
    let itemPrice = 0;
    if (priceDetails.saleQuantity && quantity >= priceDetails.saleQuantity) {
      const saleBundles = Math.floor(quantity / priceDetails.saleQuantity);
      const remainingItems = quantity % priceDetails.saleQuantity;
      itemPrice =
        saleBundles * priceDetails.salePrice +
        remainingItems * priceDetails.unitPrice;
    } else {
      itemPrice = quantity * priceDetails.unitPrice;
    }
    return itemPrice;
  }

  async calculateTotal() {
    try {
      const cartItems: any = await this.getCartItems();

      let totalPrice = 0;
      let totalSavings = 0;

      for (const cartItem of cartItems as ICart[]) {
        const { quantity, item }: ICart = cartItem;
        const pricing: any = await PricingModel.findOne({
          where: { itemId: item!.id },
        });
        const itemPrice = this.calculateItemPrice(quantity, pricing);
        totalSavings += pricing!.unitPrice * quantity - itemPrice;
        totalPrice += itemPrice;
      }

      return { totalPrice, totalSavings };
    } catch (error) {
      console.error("Error calculating total:", error);
      return { totalPrice: 0, totalSavings: 0 };
    }
  }

  async printReceipt(): Promise<void> {
    try {
      console.log(`Item        Quantity    Price`);
      console.log(`----------------------------`);

      const cartItems: any = await this.getCartItems();

      for (const cartItem of cartItems) {
        const { quantity, item } = cartItem;
        const pricing = await PricingModel.findOne({
          where: { itemId: item.id },
        });
        const itemPrice = this.calculateItemPrice(quantity, pricing);
        console.log(
          `${item.name}     ${quantity}         $${itemPrice.toFixed(2)}`
        );
      }

      const { totalPrice, totalSavings } = await this.calculateTotal();
      console.log(`\nTotal price : $${totalPrice.toFixed(2)}`);
      console.log(`You saved $${totalSavings.toFixed(2)} today.`);
    } catch (error) {
      console.error("Error printing receipt:", error);
    }
  }
}

export default new CartService() as CartService;