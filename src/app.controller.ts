import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, CookieOptions } from 'express';
import { AppService } from './app.service';
import Tokens from 'csrf';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/csrf-token')
  setXsrfToken(@Res({ passthrough: true }) response: Response): string {
    const tokens = new Tokens();
    const secret = tokens.secretSync();
    const token = tokens.create(secret);
    const options: CookieOptions = {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    };

    response.cookie('XSRF-NEST-SECRET', secret, options);
    response.cookie('XSRF-NEST-TOKEN', token, options);
    return 'set xsrf token';
  }

  @Post('/example')
  getExample(): string {
    return 'I am example';
  }
}
