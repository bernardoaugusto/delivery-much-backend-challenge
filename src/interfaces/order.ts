import { ObjectID } from 'typeorm';
import { ProductInterface } from './product';

export interface OrderInterface {
    _id?: ObjectID;

    products: ProductInterface[];
    total: number;
}
