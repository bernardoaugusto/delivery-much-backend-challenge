import { ObjectID } from 'mongodb';

import IProductRepository from '../../../interfaces/repositories/IProductRepository';
import Product from '../../../database/schemas/Product';
import { ProductInterface } from '../../../interfaces/product';
import { OptionsGetAllInterface } from '../../../interfaces/common';

export default class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        if (!productData._id) {
            const productCreated = Object.assign(new Product(), productData);
            productCreated._id = <any>new ObjectID();

            this.products.push(productCreated);

            return productCreated;
        }

        const index = this.products.findIndex(item => item._id === productData._id);

        this.products[index] = productData as Product;

        return this.products[index];
    }

    public async findByName(name: string): Promise<Product | undefined> {
        return this.products.find(product => product.name === name);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async findMany(options: OptionsGetAllInterface): Promise<Product[]> {
        return this.products;
    }
}
