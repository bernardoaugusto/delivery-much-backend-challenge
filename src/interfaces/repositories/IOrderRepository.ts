import { ObjectID } from 'mongodb';

import Order from '../../database/schemas/Order';
import { OptionsGetAllInterface } from '../common';
import { OrderInterface } from '../order';

export default interface IOrderRepository {
    createAndSave(orderData: OrderInterface): Promise<Order>;
    findOne(orderId: ObjectID): Promise<Order | undefined>;
    findMany(options: OptionsGetAllInterface): Promise<Order[]>;
}
