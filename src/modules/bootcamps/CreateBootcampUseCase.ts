import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateBootcampUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, duration, location, description, coordinator_id } =
      request.body;

    const bootcamp = await query('bootcamps')
      .insert({
        name,
        duration,
        location,
        description,
        coordinator_id,
      })
      .returning([
        'name',
        'duration',
        'location',
        'description',
        'coordinator_id',
      ]);

    return response.status(201).json(bootcamp);
  }
}
export { CreateBootcampUseCase };
