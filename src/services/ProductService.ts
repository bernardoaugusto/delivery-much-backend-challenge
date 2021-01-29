import { inject, injectable } from 'tsyringe';

import Product from '../database/schemas/Product';
import { OptionsGetAllInterface } from '../interfaces/common';

import {
    ProductInterface,
    ProductQueryParamsInterface,
} from '../interfaces/product';
import IProductRepository from '../interfaces/repositories/IProductRepository';
import { HttpError } from '../utils/errors/HttpError';

@injectable()
export default class ProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
    ) {}

    public async create(productData: ProductInterface): Promise<Product> {
        return this.productRepository.createAndSave(productData);
    }

    public async findOne(productId: string): Promise<Product> {
        const product = await this.productRepository.findOne(productId);

        if (!product) throw new HttpError(404, 'Product not found');

        return product;
    }

    public async findMany(params: ProductQueryParamsInterface): Promise<Product[]> {
        const options = {
            where: params,
        } as OptionsGetAllInterface;

        return this.productRepository.findMany(options);
    }
}
