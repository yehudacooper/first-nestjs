import { Injectable } from '@nestjs/common';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
    constructor(private myUserService: UsersService) {

    }
    authenticate(username, password): User {
        let user: User;
        let usersList = [...this.myUserService.getAll()].map(i => ({ ...i }));
        user = usersList.find(user => user.username == username && user.password == password);
        user.token = 'My-Token';
        user.password = null;
        return user;
    }
}
