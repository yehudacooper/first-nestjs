import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MyloggerMiddleware } from './mylogger.middleware';
import { UsersController } from './users/users.controller';
import { CheckTokenMiddleware } from './check-token.middleware';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UsersModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MyloggerMiddleware,CheckTokenMiddleware)
      .forRoutes(UsersController);
  }
}
