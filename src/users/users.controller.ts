import { Controller, Post, Get, Param, UseFilters, Req, ParseIntPipe,Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User1 } from '../interfaces/user.interface';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpExceptionFilter } from '../exceptionfilter.filter';
import { User } from './user.entity';
import { UserDto } from './userdto';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
// @UseFilters(new HttpExceptionFilter())

export class UsersController {
    constructor(private myUsersService: UsersService, private myAuthService: AuthService) {

    }
    @Get()
    // @UseFilters(new HttpExceptionFilter())

    findAll(): User1[] {

        let usersList = [...this.myUsersService.getAll()].map(i => ({ ...i }));
        usersList.forEach(user => user.password = null);
        console.log(this.myUsersService.getAll());
        return usersList;

    }

    @Get(':id')
    findUser(@Param('id') id, @Req() req: Request): any {
        let token = req.headers.authorization;
        let user = { ...this.myUsersService.getById(id) };
        let user1: any = verify(token, 'secret23');
        user.password = null;
        console.log(this.myUsersService.getAll());
        console.log(token);
        if (user1.username == user.username) {
            return user;
        }
        // return user1;
    }


    @Post('authenticate')
    usersWithToken(): any {
        console.log(process.env.tokenword);

        let userList2 = [];
        let usersList = [...this.myUsersService.getAll()].map(i => ({ ...i }));
        usersList.forEach(user => userList2.push(this.myAuthService.authenticate(user.username, user.password)));
        return userList2;
    }
    @Get('/user/:id')
    getUserById(@Param ('id',ParseIntPipe) id:number):Promise<User> {
      return this.myUsersService.getUserById(id);
    }


    @Post()
    createUser(@Body(ValidationPipe) userDto :UserDto){
        return this.myUsersService.createNewUser(userDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) userDto :UserDto):Promise<{accessToken:string}>{
       return this.myUsersService.signIn(userDto);
    }
    
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
       console.log(req.user); 
    }

}
