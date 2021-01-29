import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';
import { ObjectID } from 'mongodb';

import app from '../../app';
import OrderService from '../../services/OrderService';
import { isParamsInValidationErrors } from '../../utils/validation/validationError';

describe('Order Route context', () => {
    let orderServiceSpy: sinon.SinonStubbedInstance<OrderService>;

    beforeEach(() => {
        sinon.restore();
        orderServiceSpy = sinon.createStubInstance(OrderService);
    });

    it('should be call controller with order data and returns status 201', async () => {
        const orderData = { products: [{ name: 'Brazil nut', quantity: 5 }] };

        orderServiceSpy.create.resolves(<any>orderData);
        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).post('/api/orders').send(orderData);

        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual(orderData);
        expect(orderServiceSpy.create.calledWithExactly(orderData)).toBeTruthy();
    });

    it('should be return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).post('/api/orders');

        expect(res.status).toBe(400);
        expect(
            isParamsInValidationErrors(['products'], res.body.errors),
        ).toBeTruthy();
        expect(orderServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params', async () => {
        const orderData = { products: [{ name: 1, quantity: 'invalid quantity' }] };

        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).post('/api/orders').send(orderData);

        expect(res.status).toBe(400);
        expect(
            isParamsInValidationErrors(
                ['products[0].name', 'products[0].quantity'],
                res.body.errors,
            ),
        ).toBeTruthy();
        expect(orderServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findById with id returns status 200', async () => {
        const orderId = new ObjectID().toString();

        orderServiceSpy.findById.resolves(<any>'findById');
        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).get(`/api/orders/${orderId}`);

        expect(res.status).toBe(200);
        expect(res.body).toBe('findById');
        expect(orderServiceSpy.findById.calledWithExactly(orderId)).toBeTruthy();
    });

    it('should be call controller findById return status 400 when parameter is not an ObjectID', async () => {
        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).get('/api/orders/123');

        expect(res.status).toBe(400);
        expect(isParamsInValidationErrors(['id'], res.body.errors)).toBeTruthy();

        expect(orderServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be call controller findMany returns status 200 without filter', async () => {
        orderServiceSpy.findMany.resolves(<any>'findMany');
        sinon.stub(container, 'resolve').returns(orderServiceSpy);

        const res = await request(app).get(`/api/orders`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ products: 'findMany' });
        expect(orderServiceSpy.findMany.calledWithExactly()).toBeTruthy();
    });
});
