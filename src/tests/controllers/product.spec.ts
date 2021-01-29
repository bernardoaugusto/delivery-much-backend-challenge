import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { ObjectID } from 'mongodb';

import app from '../../app';
import ProductService from '../../services/ProductService';
import Product from '../../database/schemas/Product';
import ProductBuilder from '../testBuilders/productBuilder';
import { isParamsInValidationErrors } from '../../utils/validation/validationError';

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
        expect(
            isParamsInValidationErrors(
                ['name', 'price', 'quantity'],
                res.body.errors,
            ),
        ).toBeTruthy();
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
        expect(
            isParamsInValidationErrors(
                ['name', 'price', 'quantity'],
                res.body.errors,
            ),
        ).toBeTruthy();
        expect(productServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findOne with id returns status 200', async () => {
        const productId = new ObjectID().toString();

        productServiceSpy.findOne.resolves(<any>'findOne');
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).get(`/api/products/${productId}`);

        expect(res.status).toBe(200);
        expect(res.body).toBe('findOne');
        expect(productServiceSpy.findOne.calledWithExactly(productId)).toBeTruthy();
    });

    it('should be call controller findOne return status 400 when parameter is not an ObjectID', async () => {
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).get('/api/products/123');

        expect(res.status).toBe(400);
        expect(isParamsInValidationErrors(['id'], res.body.errors)).toBeTruthy();

        expect(productServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findMany returns status 200 without filter', async () => {
        productServiceSpy.findMany.resolves(<any>'findMany');
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const res = await request(app).get(`/api/products`);

        expect(res.status).toBe(200);
        expect(res.body).toBe('findMany');
        expect(productServiceSpy.findMany.calledWithExactly({})).toBeTruthy();
    });

    it('should be call controller findMany returns status 200 with filter', async () => {
        productServiceSpy.findMany.resolves(<any>'findMany');
        sinon.stub(container, 'resolve').returns(productServiceSpy);

        const queryParams = {
            name: 'any_name',
            price: '1',
            quantity: '2',
        };

        const res = await request(app).get(`/api/products`).query(queryParams);

        expect(res.status).toBe(200);
        expect(res.body).toBe('findMany');
        expect(
            productServiceSpy.findMany.calledWithExactly(queryParams),
        ).toBeTruthy();
    });
});
