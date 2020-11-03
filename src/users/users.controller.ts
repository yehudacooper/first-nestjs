import { Controller, Post, Get, Param, UseFilters, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth/auth.service';
import {Request} from 'express';
import {verify} from 'jsonwebtoken';
import { HttpExceptionFilter } from '../exceptionfilter.filter';
@Controller('users')
// @UseFilters(new HttpExceptionFilter())

export class UsersController {
    constructor(private myUsersService: UsersService, private myAuthService: AuthService) {

    }
    @Get()
    // @UseFilters(new HttpExceptionFilter())

    findAll(): User[] {

        let usersList = [...this.myUsersService.getAll()].map(i => ({ ...i }));
        usersList.forEach(user => user.password = null);
        console.log(this.myUsersService.getAll());
        return usersList;

    }

    @Get(':id')
    findUser(@Param('id') id,@Req() req:Request): any {
        let token = req.headers.authorization;
        let user = { ...this.myUsersService.getById(id) };
        let user1:any = verify(token,'secret');
        user.password = null;
        console.log(this.myUsersService.getAll());
        console.log(token);
        if(user1.username == user.username){
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


}
