// tests/app.test.js
import { assertEquals } from './deps.js';
import { shoppingListsController } from '../controllers/shoppingListsController.js';
import { shoppingListItemsController } from '../controllers/shoppingListItemsController.js';
import { shoppingListService } from '../services/shoppingListService.js';
import { shoppingListItemService } from '../services/shoppingListItemService.js';
import { ShoppingList } from '../models/shoppingList.js';

Deno.test('GET /list should return active shopping lists', async () => {
  const mockCtx = {
    render: async (view, data) => {
      assertEquals(view, 'list.ejs');
      assertEquals(data.shoppingLists.length, 2);
      assertEquals(data.shoppingLists[0].name, 'List 1');
      assertEquals(data.shoppingLists[1].name, 'List 2');
    },
  };

  const stubbedGetActiveShoppingLists = () => [
    new ShoppingList({ id: 1, name: 'List 1', active: true }),
    new ShoppingList({ id: 2, name: 'List 2', active: true }),
  ];

  const stubbedGetShoppingListById = () => null;

  shoppingListService.getActiveShoppingLists = stubbedGetActiveShoppingLists;
  shoppingListService.getShoppingListById = stubbedGetShoppingListById;

  await shoppingListsController.index(mockCtx);
});

Deno.test('GET /list/:id should return a specific shopping list', async () => {
  const mockCtx = {
    params: { id: '1' },
    render: async (view, data) => {
      assertEquals(view, 'listItem.ejs');
      assertEquals(data.shoppingList.name, 'List 1');
    },
    response: { status: 0 },
  };

  const stubbedGetShoppingListById = (id) => {
    assertEquals(id, 1);
    return new ShoppingList({ id: 1, name: 'List 1', active: true });
  };

  shoppingListService.getShoppingListById = stubbedGetShoppingListById;

  await shoppingListsController.show(mockCtx);
  assertEquals(mockCtx.response.status, 200);
});

Deno.test('GET /list/:id should return 404 if shopping list not found', async () => {
  const mockCtx = {
    params: { id: '1' },
    response: { status: 0 },
  };

  const stubbedGetShoppingListById = () => null;

  shoppingListService.getShoppingListById = stubbedGetShoppingListById;

  await shoppingListsController.show(mockCtx);
  assertEquals(mockCtx.response.status, 404);
});

Deno.test('POST /list should create a new shopping list', async () => {
  const mockCtx = {
    request: { body: async () => ({ value: { name: 'New List' } }) },
    response: { status: 0, headers: { set: () => {} } },
  };

  const stubbedCreateShoppingList = (name) => {
    assertEquals(name, 'New List');
    return new ShoppingList({ id: 1, name: 'New List', active: true });
  };

  shoppingListService.createShoppingList = stubbedCreateShoppingList;

  await shoppingListsController.create(mockCtx);
  assertEquals(mockCtx.response.status, 201);
  assertEquals(mockCtx.response.headers.get('Location'), '/list/1');
});

Deno.test('POST /list/:id/items should create a new shopping list item', async () => {
  const mockCtx = {
    params: { id: '1' },
    request: { body: async () => ({ value: { name: 'New Item' } }) },
    response: { status: 0, headers: { set: () => {} } },
  };

  const stubbedCreateShoppingListItem = (shoppingListId, name) => {
    assertEquals(shoppingListId, 1);
    assertEquals(name, 'New Item');
  };

  shoppingListItemService.createShoppingListItem = stubbedCreateShoppingListItem;

  await shoppingListItemsController.create(mockCtx);
  assertEquals(mockCtx.response.status, 201);
  assertEquals(mockCtx.response.headers.get('Location'), '/list/1');
});
