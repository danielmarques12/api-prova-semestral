import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListOneBootcampUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { bootcamp_id } = request.params;

    const bootcamp = await query({ b: 'bootcamps' })
      .select([
        'b.id',
        'b.name',
        'b.duration',
        'b.location',
        'b.description',
        'b.coordinator_id',
        'f.url',
      ])
      .innerJoin({ f: 'files' }, 'f.id', 'b.file_id')
      .where({ 'b.id': bootcamp_id });

    if (!bootcamp) {
      return response.status(404).json({ error: 'No bootcamp were found' });
    }

    return response.status(201).json(bootcamp);
  }
}
export { ListOneBootcampUseCase };
