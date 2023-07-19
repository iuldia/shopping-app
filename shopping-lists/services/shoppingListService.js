// services/shoppingListService.js
import { shoppingListRepository } from '../repositories/shoppingListRepository.js';
import { shoppingListItemRepository } from '../repositories/shoppingListItemRepository.js';

export const shoppingListService = {
  async getActiveShoppingLists() {
    return shoppingListRepository.getActiveShoppingLists();
  },

  async getAllShoppingLists() {
    const shoppingLists = await shoppingListRepository.getAllShoppingLists();
    return shoppingLists;
  },

  async getShoppingListById(id) {
    const shoppingList = await shoppingListRepository.getShoppingListById(id);

    if (shoppingList) {
      const items = await shoppingListItemRepository.getShoppingListItemsByListId(shoppingList.id);
      shoppingList.items = items;
    }

    return shoppingList;
  },

  async deactivateShoppingList(id) {
    const updated = await shoppingListRepository.updateShoppingListStatus(id, false);
    return updated;
  },

  async createShoppingList(name) {
    return shoppingListRepository.createShoppingList(name);
  },
};
