import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import query from '../../../shared/infra/knex/knex';

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
    type: string;
  };
}

class AuthenticateUserUseCase {
  async execute(
    request: Request,
    response: Response
  ): Promise<Response | IResponse> {
    const { email, password } = request.body;

    const user = await query('users').where({ email }).first();

    if (!user) {
      return response
        .status(401)
        .json({ error: 'Incorrect email or password' });
    }

    const { expiresIn } = authConfig;
    const secret_key: any = authConfig.secretKey;

    const doesPasswordsMatch = await compare(password, user.password_hash);

    if (!doesPasswordsMatch) {
      return response
        .status(401)
        .json({ error: 'Incorrect email or password' });
    }

    const token = sign({ user_id: user.id, user_type: user.type }, secret_key, {
      subject: user.id,
      expiresIn,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
