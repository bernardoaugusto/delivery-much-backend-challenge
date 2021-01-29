import Product from '../../database/schemas/Product';
import { makeProductService } from './makeInstance/productService';

describe('Product', () => {
    const productService = makeProductService;

    const makeSut = (): Promise<Product> => {
        return productService.createAndSave({
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

        const { _id, ...otherProperties } = await productService.createAndSave(
            product,
        );

        expect(otherProperties).toEqual(otherProperties);
        expect(_id).not.toBeUndefined();
    });

    it('Should return a Product by name', async () => {
        const sut = await makeSut();

        const res = await productService.findByName(sut.name);

        expect(res).toEqual(sut);
    });

    it('Should return a error when not found Product by name', async () => {
        try {
            await productService.findByName('invalid');
        } catch (error) {
            expect(error.message).toEqual('Product not found');
        }
    });

    it('Should return a Products list', async () => {
        const sut = await makeSut();

        const res = await productService.findMany({});

        expect(
            res.findIndex(product => product._id.toString() === sut._id.toString()),
        ).toBeGreaterThanOrEqual(0);
    });
});
