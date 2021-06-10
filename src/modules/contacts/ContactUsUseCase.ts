import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ContactUsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, linkedin } = request.body;

    await query('contact').insert({ name, email, linkedin });

    return response.status(201).json('Contact registered successfully');
  }
}
export { ContactUsUseCase };
