import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListStudentsBootcampsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id, type } = request.user;

    if (type !== 'estudante') {
      return response.status(401).json({ error: 'Permission denied' });
    }

    const bootcamps = await query({ b: 'bootcamps' })
      .select(['b.id', 'b.name', 'b.description', 'f.url'])
      .innerJoin({ f: 'files' }, 'f.id', 'b.file_id')
      .innerJoin({ s: 'bootcamp_students' }, 's.bootcamp_id', 'b.id')
      .where({ 's.student_id': id });

    return response.status(201).json(bootcamps);
  }
}
export { ListStudentsBootcampsUseCase };
