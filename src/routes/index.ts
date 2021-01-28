import { Request, Response, Router } from 'express';

import apiProduct from './product.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.use('/api/products', apiProduct);

export default router;
