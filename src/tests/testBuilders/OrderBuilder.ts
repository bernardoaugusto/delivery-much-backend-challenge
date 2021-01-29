import { ObjectID } from 'typeorm';
import { OrderInterface } from '../../interfaces/order';
import { ProductInterface } from '../../interfaces/product';

export default class OrderBuilder {
    order: OrderInterface;

    constructor() {
        this.order = {} as OrderInterface;
    }

    public withId(id: ObjectID): OrderBuilder {
        this.order._id = id;
        return this;
    }

    public withProducts(products: ProductInterface[]): OrderBuilder {
        this.order.products = products;
        return this;
    }

    public withTotal(total: number): OrderBuilder {
        this.order.total = total;
        return this;
    }

    public build(): OrderInterface {
        return this.order;
    }
}
