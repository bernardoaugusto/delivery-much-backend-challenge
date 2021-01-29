import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ProductService from '../services/ProductService';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;

    const productService = container.resolve(ProductService);
    const response = await productService.create(productData);

    return res.status(201).json(response);
};

export const findOne = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.params.id;

    const productService = container.resolve(ProductService);
    const response = await productService.findOne(productId);

    return res.status(200).json(response);
};
