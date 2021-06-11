import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListCoordinatorBootcampsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id, type } = request.user;

    if (type !== 'coordinator') {
      return response.status(401).json({ error: 'Permission denied' });
    }

    const bootcamps = await query({ b: 'bootcamps' })
      .select(['b.id', 'b.name', 'b.description', 'f.url'])
      .innerJoin({ f: 'files' }, 'f.id', 'b.file_id')
      .where({ 'b.coordinator_id': id });

    return response.status(201).json(bootcamps);
  }
}
export { ListCoordinatorBootcampsUseCase };
