import { ObjectID } from 'mongodb';

import Product from '../../database/schemas/Product';
import { makeProductService } from './makeInstance/productService';

describe('Product', () => {
    const productService = makeProductService;

    const makeSut = (): Promise<Product> => {
        return productService.create({
            name: 'any name',
            price: 10,
            quantity: 11,
        });
    };
    it('should be able to create a new product', async () => {
        const product = {
            name: 'Brazil nut',
            price: 5.16,
            quantity: 5,
        };

        const { _id, ...otherProperties } = await productService.create(product);

        expect(otherProperties).toEqual(otherProperties);
        expect(_id).not.toBeUndefined();
    });

    it('Should return a Product by id', async () => {
        const sut = await makeSut();

        const res = await productService.findOne(sut._id.toString());

        expect(res).toEqual(sut);
    });

    it('Should return a error when not found Product by id', async () => {
        try {
            await productService.findOne(new ObjectID().toString());
        } catch (error) {
            expect(error.message).toEqual('Product not found');
        }
    });

    it('Should return a Products list', async () => {
        const sut = await makeSut();

        const res = await productService.findMany({});

        expect(
            res.findIndex(product => product._id.toString() === sut._id.toString()),
        ).toBeGreaterThanOrEqual(0);
    });
});
