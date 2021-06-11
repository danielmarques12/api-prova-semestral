import { Router } from 'express';

import { CreateBootcampUseCase } from '../../../../modules/bootcamps/CreateBootcampUseCase';
import { ListAllBootcampsUseCase } from '../../../../modules/bootcamps/ListAllBootcampsUseCase';
import { ListCoordinatorBootcampsUseCase } from '../../../../modules/bootcamps/ListCoordinatorBootcampsUseCase';
import { ListOneBootcampUseCase } from '../../../../modules/bootcamps/ListOneBootcampUseCase';
import { ListStudentsBootcampsUseCase } from '../../../../modules/bootcamps/ListStudentsBootcampsUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const bootcampsRoutes = Router();

const createBootcampUseCase = new CreateBootcampUseCase();
const listAllBootcampsUseCase = new ListAllBootcampsUseCase();
const listCoordinatorBootcampsUseCase = new ListCoordinatorBootcampsUseCase();
const listStudentsBootcampsUseCase = new ListStudentsBootcampsUseCase();
const listOneBootcampUseCase = new ListOneBootcampUseCase();

bootcampsRoutes.post(
  '/create',
  ensureAuthenticated,
  createBootcampUseCase.execute
);

bootcampsRoutes.get(
  '/coordinator-list-bootcamps',
  ensureAuthenticated,
  listCoordinatorBootcampsUseCase.execute
);

bootcampsRoutes.get(
  '/students-list-bootcamps',
  ensureAuthenticated,
  listStudentsBootcampsUseCase.execute
);

bootcampsRoutes.get('/listall', listAllBootcampsUseCase.execute);
bootcampsRoutes.get('/list/:bootcamp_id', listOneBootcampUseCase.execute);

export { bootcampsRoutes };
