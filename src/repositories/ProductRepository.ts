import { MongoRepository, getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import IProductRepository from '../interfaces/repositories/IProductRepository';
import Product from '../database/schemas/Product';
import { ProductInterface } from '../interfaces/product';
import { OptionsGetAllInterface } from '../interfaces/common';

export default class ProductRepository implements IProductRepository {
    private ormRepository: MongoRepository<Product>;

    constructor() {
        this.ormRepository = getMongoRepository(Product, 'mongo');
    }

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        const product = this.ormRepository.create(productData);

        return this.ormRepository.save(product);
    }

    public async findByName(name: string): Promise<Product | undefined> {
        return this.ormRepository.findOne({ where: { name } });
    }

    public async findMany(options: OptionsGetAllInterface): Promise<Product[]> {
        return this.ormRepository.find(options);
    }
}
