import path from 'path';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createConnections, Connection } from 'typeorm';

dotenv.config();

export default async (): Promise<Connection[]> => {
    let mongo_port = Number(process.env.MONGO_PORT);
    let mongo_database = process.env.MONGO_DBNAME;

    if (process.env.CURRENT_ENVIROMENT === 'DEV') {
        const mongo_data = new MongoMemoryServer();

        mongo_port = await mongo_data.getPort();
        mongo_database = await mongo_data.getDbName();
    }

    return createConnections([
        {
            name: 'mongo',
            type: 'mongodb',
            host: process.env.MONGO_HOST,
            port: +mongo_port!,
            database: mongo_database,
            useUnifiedTopology: true,
            entities: [`${path.resolve(__dirname, '../schemas')}/*.{ts,js}`],
        },
    ]);
};
