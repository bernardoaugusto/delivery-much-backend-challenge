import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';

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

    public async findByName(name: string): Promise<Product> {
        const product = await this.productRepository.findByName(name);

        if (!product) throw new HttpError(404, 'Product not found');

        return product;
    }

    public async findMany(params: ProductQueryParamsInterface): Promise<Product[]> {
        const options: OptionsGetAllInterface = {
            where: {},
        };
        if (params.name) options.where!.name = { $regex: params.name };
        if (params.price) options.where!.price = Number(params.price);
        if (params.quantity) options.where!.quantity = Number(params.quantity);

        return this.productRepository.findMany(options);
    }
}
