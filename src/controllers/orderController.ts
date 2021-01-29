import { Response, Request } from 'express';
import { container } from 'tsyringe';

import OrderService from '../services/OrderService';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const orderData = req.body;

    const orderService = container.resolve(OrderService);
    const response = await orderService.create(orderData);

    return res.status(201).json(response);
};

export const findById = async (req: Request, res: Response): Promise<Response> => {
    const orderId = req.params.id;

    const orderService = container.resolve(OrderService);
    const response = await orderService.findById(orderId);

    return res.status(200).json(response);
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const orderService = container.resolve(OrderService);
    const products = await orderService.findMany();

    return res.status(200).json({ products });
};
