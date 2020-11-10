import { Injectable } from '@nestjs/common';
import { User1 } from '../../interfaces/user.interface';
import { UsersService } from '../users.service';
import {sign,verify} from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private myUserService: UsersService) {

    }
    authenticate(username, password): User1 {
        let token = sign({username:username,password:password},'secret23');
        let user: User1;
        let usersList = [...this.myUserService.getAll()].map(i => ({ ...i }));
        user = usersList.find(user => user.username == username && user.password == password);
        user.token = token;
        user.password = null;
        return user;
    }
}
