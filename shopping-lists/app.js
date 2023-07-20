// app.js
import { Application, Router } from './deps.js';
import { shoppingListsController } from './controllers/shoppingListsController.js';
import { shoppingListItemsController } from './controllers/shoppingListItemsController.js';
import { viewEngine, handlebarsEngine, oakAdapter } from './deps.js';

const app = new Application();
const router = new Router();

// View Engine Configuration
app.use(viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./views", // Define the view path for EJS templates
}));

// Add the request body parser middleware
app.use(async (ctx, next) => {
    if (ctx.request.hasBody) {
        ctx.request.body = await ctx.request.body({ type: "form" }).value;
    }
    await next();
});

// Shopping Lists
router.get('/list', shoppingListsController.index);
router.get('/list/:id', shoppingListsController.show);
router.get('/list/:id/deactivate', shoppingListsController.deactivate);
router.post('/list', shoppingListsController.create);

// Shopping List Items
router.post('/list/:id/items', shoppingListItemsController.create);
router.get('/list/:id/items/:item_id/collect', shoppingListItemsController.collectItem);

router.get('/', shoppingListsController.main);


app.use(router.routes());
app.use(router.allowedMethods());
const port = Deno.env.get("PORT") || 7777
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
