import ProductRepository from '../../repositories/ProductRepository';
import connect from '../../database/connection/connection';
import ProductBuilder from '../testBuilders/productBuilder';
import { ProductInterface } from '../../interfaces/product';

describe('Product Repository context', () => {
    let productRepository: ProductRepository;

    beforeEach(async () => {
        await connect();
        productRepository = new ProductRepository();
    });

    it('should be able to insert a new product', async () => {
        const productData = new ProductBuilder()
            .withName('Brazil nut')
            .withPrice(5.16)
            .withQuantity(5)
            .build();

        const { name, price, quantity, _id } = await productRepository.createAndSave(
            productData as ProductInterface,
        );

        expect(name).toBe(productData.name);
        expect(price).toBe(productData.price);
        expect(quantity).toBe(productData.quantity);
        expect(_id).not.toBeUndefined();
    });
});
