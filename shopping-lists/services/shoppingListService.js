// services/shoppingListService.js
import { dbClient } from '../db/database.js';
import { shoppingListItemService } from './shoppingListItemService.js';

export const shoppingListService = {
  async getActiveShoppingLists() {
    const result = await dbClient.queryObject('SELECT * FROM shopping_lists WHERE active = true');
    return result.rows;
  },

  async getAllShoppingLists() {
    const result = await dbClient.queryArray('SELECT * FROM shopping_lists');
    return result.rows;
  },

  async getShoppingListById(id) {
    const result = await dbClient.queryObject('SELECT * FROM shopping_lists WHERE id = $1', [id]);
    const shoppingList = result.rows[0];
    if (result.rows.length !== 0) {
      const items = await shoppingListItemService.getShoppingListItemsByListId(shoppingList.id);
      shoppingList.items = items;
    }
    return shoppingList;
  },

  async deactivateShoppingList(id) {
    const result = await dbClient.queryArray(
      'UPDATE shopping_lists SET active = $1 WHERE id = $2',
      [false, id]
    );
    return result.rowCount === 1;
  },

  async createShoppingList(name) {
    const result = await dbClient.queryObject(
      'INSERT INTO shopping_lists (name, active) VALUES ($1, true) RETURNING *',
      [name]
    );
    return result.rows[0];
  },
};
