import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { IUser } from '../inteface/user.interface';

export class CreateUserDto implements IUser {
    @IsNotEmpty({ message: 'The User name cannot be empty' })
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;
}
