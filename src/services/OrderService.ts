import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';

import Order from '../database/schemas/Order';
import { CreateOrderInterface, OrderInterface } from '../interfaces/order';
import IOrderRepository from '../interfaces/repositories/IOrderRepository';
import { HttpError } from '../utils/errors/HttpError';
import ProductService from './ProductService';
import { ProductInterface } from '../interfaces/product';

@injectable()
export default class OrderService {
    constructor(
        @inject('OrderRepository')
        private orderRepository: IOrderRepository,

        @inject('ProductService')
        private productService: ProductService,
    ) {}

    public async create(orderData: CreateOrderInterface): Promise<Order> {
        const products: ProductInterface[] = [];

        for (const product of orderData.products) {
            const findedProduct = await this.productService.findByName(product.name);

            if (findedProduct.quantity < product.quantity)
                throw new HttpError(
                    400,
                    `There are only ${findedProduct.quantity} units of ${product.name} in stock`,
                );

            products.push({ ...product, price: findedProduct.price });
        }

        const total = products.reduce(
            (accumulator, product) => accumulator + product.price * product.quantity,
            0,
        );

        const buildCreateOrder: OrderInterface = {
            products,
            total,
        };

        return this.orderRepository.createAndSave(buildCreateOrder);
    }

    public async findOne(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findOne(new ObjectID(orderId));

        if (!order) throw new HttpError(404, 'Order not found');

        return order;
    }

    public async findMany(): Promise<Order[]> {
        return this.orderRepository.findMany({});
    }
}
