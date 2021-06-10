import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import query from '../../shared/infra/knex/knex';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const secret_key: any = authConfig.secretKey;

    const doesPasswordsMatch = await compare(password, user.password_hash);

    if (!doesPasswordsMatch) {
      return response
        .status(401)
        .json({ error: 'Incorrect email or password' });
    }

    const token = sign({ id: user.id, type: user.type }, secret_key, {
      subject: user.id.toString(),
      expiresIn,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.type,
      },
    };

    return response.status(201).json(tokenReturn);
  }
}

export { AuthenticateUserUseCase };
