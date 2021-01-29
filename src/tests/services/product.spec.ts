import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import ProductService from '../../services/ProductService';
import Product from '../../database/schemas/Product';

describe('Product', () => {
    let fakeProductRepository: FakeProductRepository;
    let productService: ProductService;

    beforeAll(async () => {
        fakeProductRepository = new FakeProductRepository();
        productService = new ProductService(fakeProductRepository);
    });

    const makeSut = (): Promise<Product> => {
        return productService.create({
            name: 'any name',
            price: 10,
            quantity: 11,
        });
    };
    it('should be able to create a new product', async () => {
        const product = {
            name: 'Brazil nut',
            price: 5.16,
            quantity: 5,
        };

        const { _id, ...otherProperties } = await productService.create(product);

        expect(otherProperties).toEqual(otherProperties);
        expect(_id).not.toBeUndefined();
    });

    it('Should return a Legacy System by legacySystemId', async () => {
        const sut = await makeSut();

        const res = await productService.findOne(sut._id.toString());

        expect(res).toEqual(sut);
    });
});
