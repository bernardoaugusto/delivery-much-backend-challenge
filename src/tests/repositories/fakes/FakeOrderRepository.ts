import { ObjectID } from 'mongodb';

import IOrderRepository from '../../../interfaces/repositories/IOrderRepository';
import Order from '../../../database/schemas/Order';
import { OrderInterface } from '../../../interfaces/order';
import { OptionsGetAllInterface } from '../../../interfaces/common';

export default class OrderRepository implements IOrderRepository {
    private orders: Order[] = [];

    public async createAndSave(orderData: OrderInterface): Promise<Order> {
        const order = new Order();

        Object.assign(order, orderData);
        order._id = <any>new ObjectID();

        this.orders.push(order);

        return order;
    }

    public async findOne(orderId: ObjectID): Promise<Order | undefined> {
        return this.orders.find(
            order => order._id.toString() === orderId.toString(),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async findMany(options: OptionsGetAllInterface): Promise<Order[]> {
        return this.orders;
    }
}
