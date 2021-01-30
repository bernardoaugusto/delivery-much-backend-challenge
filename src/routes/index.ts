import { Request, Response, Router } from 'express';

import apiProduct from './product.routes';
import apiOrder from './order.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.use('/products', apiProduct);
router.use('/orders', apiOrder);

export default router;
