import { Router } from 'express';

import { contactRoutes } from './contact.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/contact', contactRoutes);

export { router };
