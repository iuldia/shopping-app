// repositories/shoppingListItemRepository.js
import { dbClient } from '../db/database.js';
import { ShoppingListItem } from '../models/shoppingListItem.js';

export const shoppingListItemRepository = {
  async createShoppingListItem(shoppingListId, name) {
    const result = await dbClient.queryObject(
      'INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES ($1, $2, false) RETURNING *',
      [shoppingListId, name]
    );
    return new ShoppingListItem(result.rows[0]);
  },
  async getShoppingListItemsByListId(shoppingListId) {
    const result = await dbClient.queryObject(
      'SELECT * FROM shopping_list_items WHERE shopping_list_id = $1', [shoppingListId]
    );
    return result.rows.map((row) => new ShoppingListItem(row));
  },
  async getAllShoppingListItems() {
    const result = await dbClient.queryArray('SELECT * FROM shopping_list_items');
    return result.rows;
  },
  async updateShoppingListItemStatus(itemId, collected) {
    const result = await dbClient.queryArray(
      'UPDATE shopping_list_items SET collected = $1 WHERE id = $2',
      [collected, itemId]
    );
    return result.rowCount === 1;
  },
};
