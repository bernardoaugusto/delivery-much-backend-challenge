import ProductService from '../../../services/ProductService';
import FakeFakeProductRepository from '../../repositories/fakes/FakeProductRepository';

const fakeFakeProductRepository = new FakeFakeProductRepository();

export const makeProductService = new ProductService(fakeFakeProductRepository);
