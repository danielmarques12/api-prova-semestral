import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAllBootcampsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const bootcamps = await query({ b: 'bootcamps' })
      .select(['b.id', 'b.name', 'b.description', 'f.url'])
      .innerJoin({ f: 'files' }, 'f.id', 'b.file_id');

    if (!bootcamps) {
      return response.status(404).json({ error: 'No bootcamp were found' });
    }

    return response.status(201).json(bootcamps);
  }
}
export { ListAllBootcampsUseCase };
