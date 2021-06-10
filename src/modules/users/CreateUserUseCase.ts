import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateUserUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type } = request.body;

    const userAlreadyExists = await query('users').where({ email }).first();

    if (userAlreadyExists) {
      return response.status(401).json({ error: 'User already exists' });
    }

    const password_hash = await hash(password, 10);

    const user = await query('users').insert({
      name,
      email,
      type,
      password_hash,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserUseCase };
