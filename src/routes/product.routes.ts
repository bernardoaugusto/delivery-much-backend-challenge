import { Router } from 'express';

import * as ProductController from '../controllers/productController';
import { productSchema } from '../utils/product/validators';
import validatorMiddleware from '../utils/middleware/validator';
import { idParamSchema } from '../utils/validation/common';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: productSchema }),
    ProductController.create,
);

router.get(
    '/:id',
    validatorMiddleware({ params: idParamSchema }),
    ProductController.findOne,
);

export default router;
