// models/shoppingList.js
export class ShoppingList {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.active = data.active;
    }
}