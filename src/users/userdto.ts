import{IsString,MinLength,MaxLength} from 'class-validator'
export class UserDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;
    age:number;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password:string;
}