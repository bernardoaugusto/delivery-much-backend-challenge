import { ObjectID } from 'mongodb';

import Order from '../../database/schemas/Order';
import { makeOrderService } from './makeInstance/orderService';
import { makeProductService } from './makeInstance/productService';

describe('Order', () => {
    const orderService = makeOrderService;
    const productService = makeProductService;

    const makeSut = async (): Promise<Order> => {
        await productService.createAndSave({
            name: 'any name',
            price: 10,
            quantity: 11,
        });

        return orderService.create({
            products: [
                {
                    name: 'any name',
                    quantity: 11,
                },
            ],
        });
    };
    it('should be able to create a new order', async () => {
        await productService.createAndSave({
            name: 'create',
            price: 10,
            quantity: 11,
        });

        const order = await orderService.create({
            products: [
                {
                    name: 'create',
                    quantity: 1,
                },
            ],
        });

        const { _id, ...otherProperties } = await orderService.create(order);

        expect(otherProperties).toEqual(otherProperties);
        expect(_id).not.toBeUndefined();
    });

    it('should return an error when the order value is greater than the stock', async () => {
        await productService.createAndSave({
            name: 'invalidProductName',
            price: 10,
            quantity: 11,
        });

        try {
            await orderService.create({
                products: [
                    {
                        name: 'invalidProductName',
                        quantity: 12,
                    },
                ],
            });
        } catch (error) {
            expect(error.message).toEqual(
                'There are only 11 units of invalidProductName in stock',
            );
        }
    });

    it('Should return a Order by id', async () => {
        const sut = await makeSut();

        const res = await orderService.findById(sut._id.toString());

        expect(res).toEqual(sut);
    });

    it('Should return a error when not found Order by id', async () => {
        try {
            await orderService.findById(new ObjectID().toString());
        } catch (error) {
            expect(error.message).toEqual('Order not found');
        }
    });

    it('Should return a Orders list', async () => {
        const sut = await makeSut();

        const res = await orderService.findMany();

        expect(
            res.findIndex(order => order._id.toString() === sut._id.toString()),
        ).toBeGreaterThanOrEqual(0);
    });

    it('should return a list of validated products', async () => {
        await productService.createAndSave({
            name: 'product1',
            price: 15,
            quantity: 11,
        });
        await productService.createAndSave({
            name: 'product2',
            price: 10,
            quantity: 11,
        });

        const products = [
            {
                name: 'product1',
                quantity: 1,
            },
            {
                name: 'product2',
                quantity: 1,
            },
        ];

        const expectRes = [
            {
                name: 'product1',
                price: 15,
                quantity: 1,
            },
            {
                name: 'product2',
                price: 10,
                quantity: 1,
            },
        ];

        const res = await orderService.validateProducts(products);

        expect(res).toEqual(expectRes);
    });
});
