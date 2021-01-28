import { MongoRepository, getMongoRepository } from 'typeorm';
import IProductRepository from '../interfaces/repositories/IProductRepository';
import Product from '../database/schemas/Product';
import { ProductInterface } from '../interfaces/product';

export default class ProductRepository implements IProductRepository {
    private ormRepository: MongoRepository<Product>;

    constructor() {
        this.ormRepository = getMongoRepository(Product, 'mongo');
    }

    public async createAndSave(productData: ProductInterface): Promise<Product> {
        const product = this.ormRepository.create(productData);

        return this.ormRepository.save(product);
    }
}
