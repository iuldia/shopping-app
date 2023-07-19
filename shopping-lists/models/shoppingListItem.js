// models/shoppingListItem.js
export class ShoppingListItem {
    constructor(data) {
      this.id = data.id;
      this.shopping_list_id = data.shopping_list_id;
      this.name = data.name;
      this.collected = data.collected;
    }
}
  