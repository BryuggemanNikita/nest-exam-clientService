import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILogin } from '../interface/login.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto implements ILogin {
    @ApiProperty({ example: 'user@gmail.com', description: 'Почта пользователя' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
