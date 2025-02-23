import { Router } from 'express';

import { integrationController, tickController } from '../controller';

const router: Router = Router();

router.get('/integration', integrationController);
router.post('/break', tickController);

export default router;
