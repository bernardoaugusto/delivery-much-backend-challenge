import Product from '../../database/schemas/Product';
import { ProductInterface } from '../product';

export default interface IProductRepository {
    createAndSave(productData: ProductInterface): Promise<Product>;
}
