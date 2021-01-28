import { container } from 'tsyringe';

import IProductRepository from '../interfaces/repositories/IProductRepository';
import ProductRepository from '../repositories/ProductRepository';

container.registerSingleton<IProductRepository>(
    'ProductRepository',
    ProductRepository,
);
