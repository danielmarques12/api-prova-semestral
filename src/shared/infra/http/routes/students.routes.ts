import { Router } from 'express';

import { CheckIfSubscribedUseCase } from '../../../../modules/students/CheckIfSubscribedUseCase';
import { DeleteStudentUseCase } from '../../../../modules/students/DeleteStudentUseCase';
import { ListStudentsUseCase } from '../../../../modules/students/ListStudentsUseCase';
import { SubscribeToBootcampUseCase } from '../../../../modules/students/SubscribeToBootcampUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const studentsRoutes = Router();

const subscribeToBootcampUseCase = new SubscribeToBootcampUseCase();
const checkIfSubscribedUseCase = new CheckIfSubscribedUseCase();
const listStudentsUseCase = new ListStudentsUseCase();
const deleteStudentUseCase = new DeleteStudentUseCase();

studentsRoutes.post(
  '/subscribe/:bootcamp_id',
  ensureAuthenticated,
  subscribeToBootcampUseCase.execute
);

studentsRoutes.get(
  '/:bootcamp_id/list',
  ensureAuthenticated,
  listStudentsUseCase.execute
);

studentsRoutes.get(
  '/check-if-subscribed/:bootcamp_id',
  ensureAuthenticated,
  checkIfSubscribedUseCase.execute
);

studentsRoutes.delete(
  '/delete/:student_id',
  ensureAuthenticated,
  deleteStudentUseCase.execute
);

export { studentsRoutes };
