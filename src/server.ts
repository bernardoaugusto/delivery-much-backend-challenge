import 'reflect-metadata';
import { container } from 'tsyringe';

import app from './app';
import connect from './database/connection/connection';
import './containers';
import RabbitMQServer from './RabbitMQServer';
import ProductService from './services/ProductService';

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connect();

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Service running on port ${PORT}`);
    });

    const productService = container.resolve(ProductService);

    const server = new RabbitMQServer('amqp://guest:guest@localhost:5672');
    await server.start();
    await server.consume('incremented', async message => {
        await productService.incrementProduct(
            JSON.parse(message.content.toString()),
        );
    });
    await server.consume('decremented', async message => {
        await productService.decrementProduct(
            JSON.parse(message.content.toString()),
        );
    });
}

startServer();
