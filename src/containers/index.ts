import { container } from 'tsyringe';

import IProductRepository from '../interfaces/repositories/IProductRepository';
import ProductRepository from '../repositories/ProductRepository';
import IOrderRepository from '../interfaces/repositories/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';
import ProductService from '../services/ProductService';

container.registerSingleton<IProductRepository>(
    'ProductRepository',
    ProductRepository,
);

container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);

container.registerSingleton<ProductService>('ProductService', ProductService);
