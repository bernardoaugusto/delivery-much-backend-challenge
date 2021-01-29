import { Router } from 'express';

import * as productController from '../controllers/productController';
import { productSchema } from '../utils/product/validators';
import validatorMiddleware from '../utils/middleware/validator';
import { idParamSchema } from '../utils/validation/common';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: productSchema }),
    productController.create,
);

router.get('/', productController.findAll);

router.get(
    '/:id',
    validatorMiddleware({ params: idParamSchema }),
    productController.findOne,
);

export default router;
