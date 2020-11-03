import { Injectable } from '@nestjs/common';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users.service';
import {sign,verify} from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private myUserService: UsersService) {

    }
    authenticate(username, password): User {
        let token = sign({username:username,password:password},'secret');
        let user: User;
        let usersList = [...this.myUserService.getAll()].map(i => ({ ...i }));
        user = usersList.find(user => user.username == username && user.password == password);
        user.token = token;
        user.password = null;
        return user;
    }
}
