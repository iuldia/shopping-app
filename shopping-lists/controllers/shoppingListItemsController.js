// controllers/shoppingListItemsController.js
import { shoppingListItemService } from '../services/shoppingListItemService.js';

export const shoppingListItemsController = {
  async create(ctx) {
    const { id } = ctx.params;
    const name = await ctx.request.body.get("name");

    await shoppingListItemService.createShoppingListItem(Number(id), name);

    ctx.response.status = 201;
    ctx.response.redirect(`/list/${id}`);
  },

  async collectItem(ctx) {
    const { id, item_id } = ctx.params;
    const collected = await shoppingListItemService.collectShoppingListItem(item_id);
    if (collected) {
      ctx.response.status = 200;
    } else {
      ctx.response.status = 404;
    }
    ctx.response.redirect(`/list/${id}`);
  },
};
