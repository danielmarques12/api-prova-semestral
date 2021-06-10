import { Router } from 'express';

import { DeleteStudentUseCase } from '../../../../modules/students/DeleteStudentUseCase';
import { ListStudentsUseCase } from '../../../../modules/students/ListStudentsUseCase';
import { SubscribeToBootcampUseCase } from '../../../../modules/students/SubscribeToBootcampUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const studentsRoutes = Router();

const subscribeToBootcampUseCase = new SubscribeToBootcampUseCase();
const listStudentsUseCase = new ListStudentsUseCase();
const deleteStudentUseCase = new DeleteStudentUseCase();

studentsRoutes.post(
  '/create',
  ensureAuthenticated,
  subscribeToBootcampUseCase.execute
);

studentsRoutes.get(
  '/:bootcamp_id/list',
  ensureAuthenticated,
  listStudentsUseCase.execute
);

studentsRoutes.delete(
  '/delete/:student_id/:bootcamp_id',
  ensureAuthenticated,
  deleteStudentUseCase.execute
);

export { studentsRoutes };
