import { ObjectID } from 'typeorm';
import { ProductInterface } from '../../interfaces/product';

export default class ProductBuilder {
    product: ProductInterface;

    constructor() {
        this.product = {} as ProductInterface;
    }

    public withId(id: ObjectID): ProductBuilder {
        this.product._id = id;
        return this;
    }

    public withName(name: string): ProductBuilder {
        this.product.name = name;
        return this;
    }

    public withPrice(price: number): ProductBuilder {
        this.product.price = price;
        return this;
    }

    public withQuantity(quantity: number): ProductBuilder {
        this.product.quantity = quantity;
        return this;
    }

    public build(): ProductInterface {
        return this.product;
    }
}
