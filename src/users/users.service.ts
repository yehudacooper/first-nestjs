import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import {User1} from '../interfaces/user.interface'
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './userdto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
 
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository:UserRepository,private jwtService:JwtService){
      
    }
    private userList: User1[] = [{
        id: '1',
        username: 'test',
        password: 'test',
        firstname: 'test',
        lastname: 'Testing'
    },{
        id: '2',
        username: 'test2',
        password: 'test2',
        firstname: 'test2',
        lastname: 'Testing2'
    }];

    getAll():User1[]{
        return this.userList;
    }

    getById(id:string):User1{
        let user:User1;
        user =  this.userList.find(user => user.id == id);
        return user
    }

   async getUserById(id:number):Promise<User>{
      const found = await this.UserRepository.findOne(id);
      
      if(!found){
          throw new NotFoundException('item not found');
      }
      return found;
    }

    async createNewUser(userDto:UserDto):Promise<void>{
      return this.UserRepository.createUser(userDto);
    }

    async signIn(userDto:UserDto):Promise<{accessToken:string}>{
      const username =   await this.UserRepository.validateUserPassword(userDto);
      console.log(username) ;
      if(!username){
          throw new UnauthorizedException('invalid cradentials33')
      }

      const payload ={username};
      const accessToken = await this.jwtService.sign(payload);

      return {accessToken};
    }


    

}
