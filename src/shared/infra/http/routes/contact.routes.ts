import { Router } from 'express';

import { ContactUsUseCase } from '../../../../modules/contacts/ContactUsUseCase';

const contactRoutes = Router();

const contactUsUseCase = new ContactUsUseCase();

contactRoutes.post('/', contactUsUseCase.execute);

export { contactRoutes };
