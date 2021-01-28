import { Router } from 'express';

import * as ProductController from '../controllers/productController';
import { productSchema } from '../utils/product/validators';
import validatorMiddleware from '../utils/middleware/validator';

const router = Router();

router.post(
    '/',
    validatorMiddleware({ body: productSchema }),
    ProductController.create,
);

export default router;
