import { Router } from 'express';

import * as productController from '../controllers/productController';
import { nameParamSchema, productSchema } from '../utils/product/validators';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: productSchema }),
    productController.create,
);

router.get('/', productController.findAll);

router.get(
    '/:name',
    validatorMiddleware({ params: nameParamSchema }),
    productController.findByName,
);

export default router;
