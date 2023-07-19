// controllers/shoppingListsController.js
import { shoppingListService } from '../services/shoppingListService.js';
import { shoppingListItemService } from '../services/shoppingListItemService.js';

export const shoppingListsController = {

  async main(ctx) {
    const shoppingLists = await shoppingListService.getAllShoppingLists();
    const shoppingListItems = await shoppingListItemService.getAllShoppingListItems();

    ctx.render('main.hbs', {
      shoppingLists,
      shoppingListItems,
    });
  },

  async index(ctx) {
    const shoppingLists = await shoppingListService.getActiveShoppingLists();
    await ctx.render('list.hbs', { shoppingLists });
  },

  async show(ctx) {
    const { id } = ctx.params;
    const shoppingList = await shoppingListService.getShoppingListById(id);
    if (!shoppingList) {
      ctx.response.status = 404;
      return;
    }

    await ctx.render('listItem.hbs', { shoppingList });
  },

  async deactivate(ctx) {
    const { id } = ctx.params;
    const deactivated = await shoppingListService.deactivateShoppingList(id);
    if (deactivated) {
      ctx.response.status = 200;
    } else {
      ctx.response.status = 404;
    }
    ctx.response.redirect(`/list`);
  },

  async create(ctx) {
    const name = ctx.request.body.get("name");
    await shoppingListService.createShoppingList(name);
    ctx.response.status = 201;
    ctx.response.redirect(`/list`);
  },
};
