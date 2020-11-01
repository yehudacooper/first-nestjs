import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpBadtokenException extends HttpException {
    constructor() {
      super({
        status: HttpStatus.FORBIDDEN,
        error: 'WRONG TOKEN OR NOT GIVEN',
      }, HttpStatus.FORBIDDEN);
      
    }
  }