import ProductRepository from '../../repositories/ProductRepository';
import connect from '../../database/connection/connection';
import ProductBuilder from '../testBuilders/ProductBuilder';
import { ProductInterface } from '../../interfaces/product';

describe('Product Repository context', () => {
    let productRepository: ProductRepository;

    beforeAll(async () => {
        await connect(true);
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

    it('Should be return a product when find by id', async () => {
        const productData = new ProductBuilder()
            .withName('any name')
            .withPrice(100)
            .withQuantity(8)
            .build();

        const { _id } = await productRepository.createAndSave(productData);

        const res = await productRepository.findOne(<any>_id);

        expect(res).toEqual({ ...productData, _id });
    });

    it('Should be return a list of products when options not provided', async () => {
        const productData = new ProductBuilder()
            .withName('any name 1')
            .withPrice(178)
            .withQuantity(88)
            .build();

        const sut = await productRepository.createAndSave(productData);

        const options = {};
        const res = await productRepository.findMany(options);

        expect(
            res.findIndex(product => product._id.toString() === sut._id.toString()),
        ).toBeGreaterThanOrEqual(0);
    });

    it('Should be return a list of products when options are provided', async () => {
        const productData = new ProductBuilder()
            .withName('specific name')
            .withPrice(178)
            .withQuantity(88)
            .build();

        const sut = await productRepository.createAndSave(productData);

        const options = { where: { name: 'specific name' } };
        const res = await productRepository.findMany(options);

        expect(res[0]).toEqual(sut);
        expect(res.length).toBe(1);
    });
});
