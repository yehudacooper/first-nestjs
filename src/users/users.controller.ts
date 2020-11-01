import { Controller, Post, Get, Param, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth/auth.service';
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
    findUser(@Param('id') id): User {
        let user = { ...this.myUsersService.getById(id) };
        user.password = null;
        console.log(this.myUsersService.getAll());
        return user;
    }


    @Post('authenticate')
    usersWithToken(): any {
        let userList2 = [];
        let usersList = [...this.myUsersService.getAll()].map(i => ({ ...i }));
        usersList.forEach(user => userList2.push(this.myAuthService.authenticate(user.username, user.password)));
        return userList2;
    }


}
