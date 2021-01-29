import OrderRepository from '../../repositories/OrderRepository';
import connect from '../../database/connection/connection';
import OrderBuilder from '../testBuilders/OrderBuilder';
import { OrderInterface } from '../../interfaces/order';
import ProductBuilder from '../testBuilders/ProductBuilder';

describe('Order Repository context', () => {
    let orderRepository: OrderRepository;

    beforeAll(async () => {
        await connect(true);
        orderRepository = new OrderRepository();
    });

    it('should be able to insert a new order', async () => {
        const productData = new ProductBuilder()
            .withName('Brazil nut')
            .withPrice(5.16)
            .withQuantity(2)
            .build();

        const orderData = new OrderBuilder()
            .withProducts([productData])
            .withTotal(10.32)
            .build();

        const { products, total, _id } = await orderRepository.createAndSave(
            orderData as OrderInterface,
        );

        expect(products).toEqual(orderData.products);
        expect(total).toBe(orderData.total);
        expect(_id).not.toBeUndefined();
    });

    it('Should be return a order when find by id', async () => {
        const productData1 = new ProductBuilder()
            .withName('product name')
            .withPrice(9.57)
            .withQuantity(3)
            .build();
        const productData2 = new ProductBuilder()
            .withName('product name')
            .withPrice(5.78)
            .withQuantity(5)
            .build();

        const orderData = new OrderBuilder()
            .withProducts([productData1, productData2])
            .withTotal(57.61)
            .build();

        const { _id } = await orderRepository.createAndSave(orderData);

        const res = await orderRepository.findById(<any>_id);

        expect(res).toEqual({ ...orderData, _id });
    });

    it('Should be return a list of orders when options not provided', async () => {
        const productData = new ProductBuilder()
            .withName('test list')
            .withPrice(2)
            .withQuantity(2)
            .build();

        const orderData = new OrderBuilder()
            .withProducts([productData])
            .withTotal(4)
            .build();

        const sut = await orderRepository.createAndSave(orderData);

        const options = {};
        const res = await orderRepository.findMany(options);

        expect(
            res.findIndex(order => order._id.toString() === sut._id.toString()),
        ).toBeGreaterThanOrEqual(0);
    });
});
