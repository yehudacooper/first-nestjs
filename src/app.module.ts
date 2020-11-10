import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MyloggerMiddleware } from './mylogger.middleware';
import { UsersController } from './users/users.controller';
import { CheckTokenMiddleware } from './check-token.middleware';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// import { CatsController } from '../src/cat/cats/cats.controller';
@Module({
  imports: [UsersModule,ConfigModule.forRoot(), CatsModule,TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(MyloggerMiddleware,CheckTokenMiddleware)
  //     .forRoutes(UsersController);
  // }
}
