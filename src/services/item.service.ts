import { ItemModel } from "../models/items.model";

export class ItemService {
  async getItem(itemName: string) {
    try {
      const item = await ItemModel.findOne({
        where: { name: itemName.toLowerCase() },
      });
      if (item) {
        return item;
      } else {
        console.log(`Item '${itemName}' not found.`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemService() as ItemService;
