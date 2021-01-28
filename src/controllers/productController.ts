import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ProductService from '../services/ProductService';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;

    const productService = container.resolve(ProductService);
    const response = await productService.create(productData);

    return res.status(201).json(response);
};
