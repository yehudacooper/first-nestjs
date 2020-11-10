import { Module } from '@nestjs/common';
import { CatsController } from '../cat/cats/cats.controller';
import { CatsService } from '../cat/cat.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
