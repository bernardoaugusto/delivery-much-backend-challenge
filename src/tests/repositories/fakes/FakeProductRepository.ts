import { ObjectID } from 'bson';

import IProductRepository from '../../../interfaces/repositories/IProductRepository';
import Product from '../../../database/schemas/Product';
import { ProductInterface } from '../../../interfaces/product';

export default class ProductRepository implements IProductRepository {
    private products: ProductInterface[] = [];

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        const product = new Product();

        Object.assign(product, productData);
        product._id = <any>new ObjectID().toString();

        this.products.push(product);

        return product;
    }
}
