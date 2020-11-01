import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface'
@Injectable()
export class UsersService {

    private userList: User[] = [{
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

    getAll():User[]{
        return this.userList;
    }

    getById(id:string):User{
        let user:User;
        user =  this.userList.find(user => user.id == id);
        return user
    }

}
