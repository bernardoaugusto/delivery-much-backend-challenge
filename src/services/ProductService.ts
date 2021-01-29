import { inject, injectable } from 'tsyringe';

import Product from '../database/schemas/Product';

import { ProductInterface } from '../interfaces/product';
import IProductRepository from '../interfaces/repositories/IProductRepository';
import { HttpError } from '../utils/errors/HttpError';

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

    public async findOne(productId: string): Promise<Product> {
        const product = await this.productRepository.findOne(productId);

        if (!product) throw new HttpError(404, 'Product not found');

        return product;
    }
}
