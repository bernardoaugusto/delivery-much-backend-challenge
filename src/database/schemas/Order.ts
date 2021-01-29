import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';
import Product from './Product';

@Entity('orders')
export default class Order {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    products: Product[];

    @Column()
    total: number;
}
