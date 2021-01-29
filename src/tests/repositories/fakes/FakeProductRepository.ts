import { ObjectID } from 'mongodb';

import IProductRepository from '../../../interfaces/repositories/IProductRepository';
import Product from '../../../database/schemas/Product';
import { ProductInterface } from '../../../interfaces/product';
import { OptionsGetAllInterface } from '../../../interfaces/common';

export default class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        const product = new Product();

        Object.assign(product, productData);
        product._id = <any>new ObjectID();

        this.products.push(product);

        return product;
    }

    public async findById(productId: ObjectID): Promise<Product | undefined> {
        return this.products.find(
            product => product._id.toString() === productId.toString(),
        );
    }

    public async findByName(name: string): Promise<Product | undefined> {
        return this.products.find(product => product.name === name);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async findMany(options: OptionsGetAllInterface): Promise<Product[]> {
        return this.products;
    }
}
