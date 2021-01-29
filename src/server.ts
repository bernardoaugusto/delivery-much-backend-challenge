import 'reflect-metadata';
import app from './app';

import connect from './database/connection/connection';
import './containers';
import RabbitmqServer from './rabbitmqServer';

const PORT = process.env.PORT || 3000;

async function startServer() {
    connect();

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Service running on port ${PORT}`);
    });

    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672');
    await server.start();
    await server.consume('incremented', message =>
        console.log(`incremented ${message.content.toString()}`),
    );
    await server.consume('decremented', message =>
        console.log(`decremented ${message.content.toString()}`),
    );
}

startServer();
