import { Injectable, NestMiddleware,RequestMethod } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class MyloggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.params);
    console.log(req.headers);
    if(req.method == 'POST'){
      console.log(req.body);
    }
    next();
  }
}
