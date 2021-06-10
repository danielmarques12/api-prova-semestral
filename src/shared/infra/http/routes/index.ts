import { Router } from 'express';

import { bootcampsRoutes } from './bootcamps.routes';
import { contactRoutes } from './contact.routes';
import { filesRoutes } from './files.routes';
import { studentsRoutes } from './students.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/files', filesRoutes);
router.use('/bootcamps', bootcampsRoutes);
router.use('/students', studentsRoutes);
router.use('/contact', contactRoutes);

export { router };
