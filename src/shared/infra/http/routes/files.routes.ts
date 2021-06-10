import { Router } from 'express';

import { UploadFilesUseCase } from '../../../../modules/files/UploadFilesUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const filesRoutes = Router();

const uploadFilesUseCase = new UploadFilesUseCase();

filesRoutes.post(
  '/upload/:bootcamp_id',
  ensureAuthenticated,
  uploadFilesUseCase.execute
);

export { filesRoutes };
