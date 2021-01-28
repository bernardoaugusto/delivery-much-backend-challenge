import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import ProductService from '../../services/ProductService';

describe('Product', () => {
    it('should be able to create a new product', async () => {
        const fakeProductRepository = new FakeProductRepository();
        const createProduct = new ProductService(fakeProductRepository);

        const product = {
            name: 'Brazil nut',
            price: 5.16,
            quantity: 5,
        };

        const { _id, ...otherProperties } = await createProduct.create(product);

        expect(otherProperties).toEqual(otherProperties);
        expect(_id).not.toBeUndefined();
    });
});
