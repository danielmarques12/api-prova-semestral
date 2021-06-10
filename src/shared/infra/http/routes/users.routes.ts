import { Router } from 'express';

import { AuthenticateUserUseCase } from '../../../../modules/users/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../../../../modules/users/CreateUserUseCase';

const usersRoutes = Router();

const createUserUseCase = new CreateUserUseCase();
const authenticateUserUseCase = new AuthenticateUserUseCase();

usersRoutes.post('/create', createUserUseCase.execute);
usersRoutes.post('/auth', authenticateUserUseCase.execute);

export { usersRoutes };
