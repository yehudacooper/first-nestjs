import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { UserDto } from "./userdto";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userDto:UserDto):Promise<void>{
      const {username,age,password} = userDto;
      const salt= await bcrypt.genSalt();
      const user = new User();
      user.username = username;
      user.age = age;
      user.salt = salt;
      user.password = await this.hashPassword(password,salt);
     await user.save();

    //  return user;
    }
    
    async validateUserPassword(userDto:UserDto):Promise<string>{
       const{username,password} = userDto;
       const user = await this.findOne({username});
       if(user && await user.validatePassword(password)){
           return user.username;
       }else{
           return null;
       }
    }



    private async hashPassword(password:string,salt:string):Promise<string>{
       return bcrypt.hash(password,salt);
    }
}