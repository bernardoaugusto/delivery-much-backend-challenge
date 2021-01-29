import OrderService from '../../../services/OrderService';
import FakeFakeOrderRepository from '../../repositories/fakes/FakeOrderRepository';
import { makeProductService } from './productService';

const fakeFakeOrderRepository = new FakeFakeOrderRepository();

export const makeOrderService = new OrderService(
    fakeFakeOrderRepository,
    makeProductService,
);
