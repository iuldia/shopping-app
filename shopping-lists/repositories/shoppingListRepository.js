// repositories/shoppingListRepository.js
import { dbClient } from '../db/database.js';
import { ShoppingList } from '../models/shoppingList.js';

export const shoppingListRepository = {
  async getActiveShoppingLists() {
    const result = await dbClient.queryObject('SELECT * FROM shopping_lists WHERE active = true');
    return result.rows.map(row => new ShoppingList(row));
  },

  async getAllShoppingLists() {
    const result = await dbClient.queryArray('SELECT * FROM shopping_lists');
    return result.rows;
  },

  async getShoppingListById(id) {
    const result = await dbClient.queryObject('SELECT * FROM shopping_lists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return undefined;
    }
    return new ShoppingList(result.rows[0]);
  },

  async createShoppingList(name) {
    const result = await dbClient.queryObject(
      'INSERT INTO shopping_lists (name, active) VALUES ($1, true) RETURNING *',
      [name]
    );
    return new ShoppingList(result.rows[0]);
  },

  async updateShoppingListStatus(id, active) {
    const result = await dbClient.queryArray(
      'UPDATE shopping_lists SET active = $1 WHERE id = $2',
      [active, id]
    );
    return result.rowCount === 1;
  },
};
