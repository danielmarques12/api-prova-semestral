import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListMyBootcampsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id, type } = request.user;

    if (type !== 'coordinator') {
      return response.status(401).json({ error: 'Permission denied' });
    }

    const bootcamps = await query('bootcamps')
      .select(['id', 'name'])
      .where({ coordinator_id: id });

    return response.status(201).json(bootcamps);
  }
}
export { ListMyBootcampsUseCase };
