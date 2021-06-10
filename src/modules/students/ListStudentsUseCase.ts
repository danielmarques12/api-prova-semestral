import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListStudentsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { bootcamp_id } = request.params;

    const students = await query
      .select(['s.id', 'u.name as student'])
      .from({ s: 'bootcamp_students' })
      .innerJoin({ u: 'users' }, 's.student_id', 'u.id')
      .where({ 's.bootcamp_id': bootcamp_id });

    if (!students) {
      return response.status(404).json({ error: 'No students were found' });
    }

    return response.status(201).json(students);
  }
}
export { ListStudentsUseCase };
