import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {PassportModule} from '@nestjs/passport';
import{ JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'mysecret',
      signOptions:{
        expiresIn:3600,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,JwtStrategy
  ],
  exports:[
    JwtStrategy,PassportModule,
  ],
})
export class UsersModule {}
