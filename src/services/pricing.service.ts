import { IItem } from "../models/items.model";
import { PricingModel } from "../models/pricing.model";
import ItemService from "./item.service";

export class PricingService {
  async getItemPricing(itemName: string) {
    const item = (await ItemService.getItem(itemName)) as IItem | undefined;
    if (item) {
      const { id } = item;
      const pricing = await PricingModel.findOne({ where: { itemId: id } });
      if (!pricing) {
        throw new Error(`Pricing for item '${itemName}' not found.`);
      }
      return { item, pricing };
    } else {
      console.log(`Item '${itemName}' not found.`);
    }
  }
}

export default new PricingService() as PricingService;
