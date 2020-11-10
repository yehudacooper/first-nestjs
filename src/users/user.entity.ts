import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bycrpt from 'bcrypt'
@Entity()
export class User extends BaseEntity{
@PrimaryGeneratedColumn()
id:number;

@Column()
username:string;

@Column()
age:number;

@Column()
password:string;

@Column()
salt:string;

async validatePassword(password:string):Promise<boolean>{
  const hash = await bycrpt.hash(password,this.salt);
  return hash == this.password;
}
}