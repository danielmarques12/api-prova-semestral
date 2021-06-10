import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class DeleteStudentUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { student_id, bootcamp_id } = request.params;
    const { type } = request.user;

    if (type !== 'coordinator') {
      return response.status(401).json({ error: 'Permission denied' });
    }

    const student = await query('bootcamp_students')
      .where({ student_id, bootcamp_id })
      .delete();

    if (!student) {
      return response.status(404).json({ error: 'Student not found' });
    }

    return response.status(201).json('Student deleted!');
  }
}
export { DeleteStudentUseCase };
