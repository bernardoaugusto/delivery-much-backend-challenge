import { ObjectID } from 'typeorm';

export interface ProductInterface {
    _id?: ObjectID;

    name: string;
    price: number;
    quantity: number;
}