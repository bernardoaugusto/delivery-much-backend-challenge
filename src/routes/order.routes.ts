import { Router } from 'express';

import * as orderController from '../controllers/orderController';
import { orderCreateSchema } from '../utils/order/validators';
import validatorMiddleware from '../utils/middleware/validator';
import { idParamSchema } from '../utils/validation/common';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: orderCreateSchema }),
    orderController.create,
);

router.get('/', orderController.findAll);

router.get(
    '/:id',
    validatorMiddleware({ params: idParamSchema }),
    orderController.findById,
);

export default router;
