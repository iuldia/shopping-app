import { Client } from '../deps.js'

const dbClient = new Client({
    user: "username",
    database: "database",
    hostname: "database-p1-5211bc91-0b55-4f09-b2ef-4526738ec721",
    password: "password",
    port: 5432
});

try {
    await dbClient.connect();
} catch (error) {
    console.log(error)
}

export {dbClient}