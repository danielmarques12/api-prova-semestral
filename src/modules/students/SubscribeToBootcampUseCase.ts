import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class SubscribeToBootcampUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: student_id } = request.user;
    const { bootcamp_id } = request.params;

    await query('bootcamp_students').insert({
      student_id,
      bootcamp_id,
    });

    return response.status(201).json('Student subscribed successfully');
  }
}
export { SubscribeToBootcampUseCase };
