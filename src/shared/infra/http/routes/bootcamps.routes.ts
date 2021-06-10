import { Router } from 'express';

import { CreateBootcampUseCase } from '../../../../modules/bootcamps/CreateBootcampUseCase';
import { ListAllBootcampsUseCase } from '../../../../modules/bootcamps/ListAllBootcampsUseCase';
import { ListOneBootcampUseCase } from '../../../../modules/bootcamps/ListOneBootcampUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const bootcampsRoutes = Router();

const createBootcampUseCase = new CreateBootcampUseCase();
const listAllBootcampsUseCase = new ListAllBootcampsUseCase();
const listOneBootcampUseCase = new ListOneBootcampUseCase();

bootcampsRoutes.post(
  '/create',
  ensureAuthenticated,
  createBootcampUseCase.execute
);
bootcampsRoutes.get('/listall', listAllBootcampsUseCase.execute);
bootcampsRoutes.get('/list/:bootcamp_id', listOneBootcampUseCase.execute);

export { bootcampsRoutes };
