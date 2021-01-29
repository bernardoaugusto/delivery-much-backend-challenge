import Product from '../../database/schemas/Product';
import { OptionsGetAllInterface } from '../common';
import { ProductInterface } from '../product';

export default interface IProductRepository {
    createAndSave(productData: ProductInterface): Promise<Product>;
    findOne(productId: string): Promise<Product | undefined>;
    findMany(options: OptionsGetAllInterface): Promise<Product[]>;
}
