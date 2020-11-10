import { Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { JoiValidationPipe } from './validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
