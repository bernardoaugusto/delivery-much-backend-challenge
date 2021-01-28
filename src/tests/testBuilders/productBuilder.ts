import { ObjectID } from 'typeorm';
import { ProductInterface } from '../../interfaces/product';

class ProductBuilder {
    product: Partial<ProductInterface>;

    constructor() {
        this.product = {};
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

    public build(): Partial<ProductInterface> {
        return this.product;
    }
}

export default ProductBuilder;
