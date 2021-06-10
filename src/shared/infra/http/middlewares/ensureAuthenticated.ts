/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';

interface IPayload {
  id: number;
  type: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const secret_key: any = authConfig.secretKey;

  if (!authHeader) {
    return response.status(401).json({ error: 'Missing token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret_key);

    const { id, type } = decoded as IPayload;

    request.user = {
      id,
      type,
    };

    next();
  } catch {
    return response.status(401).json({ error: 'Invalid token' });
  }
}
