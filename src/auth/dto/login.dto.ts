import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILogin } from '../interface/login.interface';

export class LoginUserDto implements ILogin {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
