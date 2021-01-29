/* eslint-disable no-console */
import neatCsv from 'neat-csv';
import fs from 'fs';

import connect from '../connection/connection';
import ProductRepository from '../../repositories/ProductRepository';
import { ProductInterface } from '../../interfaces/product';

const insertData = async (products: ProductInterface[]): Promise<void> => {
    const [connection] = await connect();
    const productRepository = new ProductRepository();

    for (const product of products) {
        await productRepository.createAndSave(product);
    }

    console.info('----------- Data Inserted on the DataBase -----------');
    connection.close();
};

export const seed = async (): Promise<void> => {
    fs.readFile('./products.csv', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const products = await neatCsv(data);
        const formattedProducts = products.map(product => {
            return {
                name: product.name,
                price: Number(product.price),
                quantity: Number(product.quantity),
            };
        });

        await insertData(formattedProducts);
    });
};

seed();
