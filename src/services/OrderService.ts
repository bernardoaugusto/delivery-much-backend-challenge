import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';

import Order from '../database/schemas/Order';
import { CreateOrderInterface } from '../interfaces/order';
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

    public async validateProducts(
        products: {
            name: string;
            quantity: number;
        }[],
    ): Promise<ProductInterface[]> {
        const productsResponse: ProductInterface[] = [];

        for (const product of products) {
            const findProduct = await this.productService.findByName(product.name);

            if (findProduct.quantity < product.quantity)
                throw new HttpError(
                    400,
                    `There are only ${findProduct.quantity} units of ${product.name} in stock`,
                );

            productsResponse.push({ ...product, price: findProduct.price });
        }

        return productsResponse;
    }

    public async create(orderData: CreateOrderInterface): Promise<Order> {
        const products = await this.validateProducts(orderData.products);

        const total = products.reduce(
            (accumulator, product) => accumulator + product.price * product.quantity,
            0,
        );

        return this.orderRepository.createAndSave({ products, total });
    }

    public async findById(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findById(new ObjectID(orderId));

        if (!order) throw new HttpError(404, 'Order not found');

        return order;
    }

    public async findMany(): Promise<Order[]> {
        return this.orderRepository.findMany();
    }
}
