import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ProductService from '../services/ProductService';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;

    const productService = container.resolve(ProductService);
    const response = await productService.create(productData);

    return res.status(201).json(response);
};

export const findByName = async (req: Request, res: Response): Promise<Response> => {
    const productName = req.params.name;

    const productService = container.resolve(ProductService);
    const response = await productService.findByName(productName);

    return res.status(200).json(response);
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const productService = container.resolve(ProductService);
    const orders = await productService.findMany(req.query);

    return res.status(200).json({ orders });
};
