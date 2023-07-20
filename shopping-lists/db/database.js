import { Client } from '../deps.js'

const dbClient = new Client(Deno.env.get("DATABASE_URL") || "postgres://username:password@database-p1-5211bc91-0b55-4f09-b2ef-4526738ec721:5432/database?sslmode=require");

await dbClient.connect();

export {dbClient}