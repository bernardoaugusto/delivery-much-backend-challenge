import { inject, injectable } from 'tsyringe';

import Product from '../database/schemas/Product';

import { ProductInterface } from '../interfaces/product';
import IProductRepository from '../interfaces/repositories/IProductRepository';

@injectable()
export default class ProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
    ) {}

    public async create(productData: ProductInterface): Promise<Product> {
        const productCreated = await this.productRepository.createAndSave(
            productData,
        );

        return productCreated;
    }
}
