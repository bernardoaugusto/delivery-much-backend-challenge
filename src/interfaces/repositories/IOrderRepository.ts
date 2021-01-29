import { ObjectID } from 'mongodb';

import Order from '../../database/schemas/Order';
import { OrderInterface } from '../order';

export default interface IOrderRepository {
    createAndSave(orderData: OrderInterface): Promise<Order>;
    findById(orderId: ObjectID): Promise<Order | undefined>;
    findMany(): Promise<Order[]>;
}
