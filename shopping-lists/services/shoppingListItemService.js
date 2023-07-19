// services/shoppingListItemService.js
import { shoppingListItemRepository } from '../repositories/shoppingListItemRepository.js';

export const shoppingListItemService = {
  async createShoppingListItem(shoppingListId, name) {
    return shoppingListItemRepository.createShoppingListItem(shoppingListId, name);
  },

  async collectShoppingListItem(itemId) {
    const updated = await shoppingListItemRepository.updateShoppingListItemStatus(itemId, true);
    return updated;
  },

  async getAllShoppingListItems() {
    const shoppingListItems = await shoppingListItemRepository.getAllShoppingListItems();
    return shoppingListItems;
  },
};
