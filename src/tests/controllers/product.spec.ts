import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import ProductService from '../../services/ProductService';
import Product from '../../database/schemas/Product';
import ProductBuilder from '../testBuilders/productBuilder';

describe('Product Route context', () => {
    let productServiceSpy: sinon.SinonStubbedInstance<ProductService>;

    beforeEach(() => {
        sinon.restore();
        productServiceSpy = sinon.createStubInstance(ProductService);
    });

    it('should be call controller with product data and returns status 201', async () => {
        const productData = new ProductBuilder()
            .withName('Brazil nut')
            .withPrice(5.16)
            .withQuantity(5)
            .build() as Product;

        productServiceSpy.create.resolves(<any>productData);
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).post('/api/products').send(productData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(productData);
        expect(productServiceSpy.create.calledWithExactly(productData)).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).post('/api/products');

        expect(res.status).toBe(400);
        expect(productServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params', async () => {
        const productData = new ProductBuilder()
            .withName(<any>1)
            .withPrice(<any>'invalid price')
            .withQuantity(<any>'invalid quantity')
            .build() as Product;

        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).post('/api/products').send(productData);

        expect(res.status).toBe(400);
        expect(productServiceSpy.create.notCalled).toBeTruthy();
    });
});
