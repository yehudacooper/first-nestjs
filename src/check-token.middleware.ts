import { Injectable, NestMiddleware, HttpException, HttpStatus, ForbiddenException, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './exceptionfilter.filter';
import { HttpBadtokenException } from './http-badtoken';

@Injectable()
// @UseFilters(new HttpExceptionFilter())

export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.method == 'POST') {
      next()
    }
    else if (req.params['token'] == 'My-Token' || req.headers['token'] == 'My-Token')
      next();
    else {
      // throw new ForbiddenException();
      throw new HttpBadtokenException();
      
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: 'WRONG TOKEN OR NOT GIVEN',
      // }, HttpStatus.FORBIDDEN);
    }
  }
}
