import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('products')
export default class Product {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;
}
