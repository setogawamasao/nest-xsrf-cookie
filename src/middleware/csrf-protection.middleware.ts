import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import Tokens from 'csrf';
import { verify } from 'crypto';

@Injectable()
export class CsrfProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const tokens = new Tokens();
    const secret = req.cookies['XSRF-NEST-SECRET'];
    const token = req.cookies['XSRF-NEST-TOKEN'];

    console.log('secret', secret);
    console.log('token', token);

    if (!secret || !token) {
      throw new Error('unset token.');
    }

    if (!tokens.verify(secret, token)) {
      throw new Error('invalid token.');
    } else {
      console.log('verify OK');
    }
    next();
  }
}
