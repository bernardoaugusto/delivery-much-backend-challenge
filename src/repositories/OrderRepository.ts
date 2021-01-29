import { MongoRepository, getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import IOrderRepository from '../interfaces/repositories/IOrderRepository';
import Order from '../database/schemas/Order';
import { OrderInterface } from '../interfaces/order';

export default class OrderRepository implements IOrderRepository {
    private ormRepository: MongoRepository<Order>;

    constructor() {
        this.ormRepository = getMongoRepository(Order, 'mongo');
    }

    public async createAndSave(orderData: OrderInterface): Promise<Order> {
        const order = this.ormRepository.create(orderData);

        return this.ormRepository.save(order);
    }

    public async findById(orderId: ObjectID): Promise<Order | undefined> {
        return this.ormRepository.findOne({ where: { _id: orderId } });
    }

    public async findMany(): Promise<Order[]> {
        return this.ormRepository.find();
    }
}
