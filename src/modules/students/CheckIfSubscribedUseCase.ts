import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CheckIfSubscribedUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: student_id } = request.user;
    const { bootcamp_id } = request.params;

    const studentIsSubscribed = await query('bootcamp_students').where({
      student_id,
      bootcamp_id,
    });

    if (studentIsSubscribed.length === 0) {
      return response.status(201).json(false);
    }

    return response.status(201).json(true);
  }
}
export { CheckIfSubscribedUseCase };
