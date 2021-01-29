import { ObjectID } from 'bson';

import IProductRepository from '../../../interfaces/repositories/IProductRepository';
import Product from '../../../database/schemas/Product';
import { ProductInterface } from '../../../interfaces/product';
import { OptionsGetAllInterface } from '../../../interfaces/common';

export default class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        const product = new Product();

        Object.assign(product, productData);
        product._id = <any>new ObjectID().toString();

        this.products.push(product);

        return product;
    }

    public async findOne(productId: string): Promise<Product | undefined> {
        return this.products.find(product => <any>product._id === productId);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async findMany(options: OptionsGetAllInterface): Promise<Product[]> {
        return this.products;
    }
}
