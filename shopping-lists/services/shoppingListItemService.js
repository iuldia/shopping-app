// services/shoppingListItemService.js
import { dbClient } from '../db/database.js';

export const shoppingListItemService = {
  async createShoppingListItem(shoppingListId, name) {
    const result = await dbClient.queryObject(
      'INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES ($1, $2, false) RETURNING *',
      [shoppingListId, name]
    );
    return result.rows[0];
  },

  async collectShoppingListItem(itemId) {
    const result = await dbClient.queryArray(
      'UPDATE shopping_list_items SET collected = $1 WHERE id = $2',
      [true, itemId]
    );
    return result.rowCount === 1;
  },

  async getAllShoppingListItems() {
    const result = await dbClient.queryArray('SELECT * FROM shopping_list_items');
    return result.rows;
  },

  async getShoppingListItemsByListId(shoppingListId) {
    const result = await dbClient.queryObject(
      'SELECT * FROM shopping_list_items WHERE shopping_list_id = $1', [shoppingListId]
    );
    return result.rows;
  },
};
