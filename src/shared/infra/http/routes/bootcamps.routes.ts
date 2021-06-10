import { Router } from 'express';

import { CreateBootcampUseCase } from '../../../../modules/bootcamps/CreateBootcampUseCase';
import { ListAllBootcampsUseCase } from '../../../../modules/bootcamps/ListAllBootcampsUseCase';
import { ListMyBootcampsUseCase } from '../../../../modules/bootcamps/ListMyBootcampsUseCase';
import { ListOneBootcampUseCase } from '../../../../modules/bootcamps/ListOneBootcampUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const bootcampsRoutes = Router();

const createBootcampUseCase = new CreateBootcampUseCase();
const listAllBootcampsUseCase = new ListAllBootcampsUseCase();
const listMyBootcampsUseCase = new ListMyBootcampsUseCase();
const listOneBootcampUseCase = new ListOneBootcampUseCase();

bootcampsRoutes.post(
  '/create',
  ensureAuthenticated,
  createBootcampUseCase.execute
);

bootcampsRoutes.get(
  '/list-my-bootcamps',
  ensureAuthenticated,
  listMyBootcampsUseCase.execute
);

bootcampsRoutes.get('/listall', listAllBootcampsUseCase.execute);
bootcampsRoutes.get('/list/:bootcamp_id', listOneBootcampUseCase.execute);

export { bootcampsRoutes };
