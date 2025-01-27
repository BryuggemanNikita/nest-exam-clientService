import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IUser } from '../inteface/user.interface';
import { IRole } from 'src/roles/interface/role.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
    @ApiProperty({ example: 'user@gmail.com', description: 'Почта пользователя' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: 'Jhon', description: 'Имя пользователя' })
    @IsNotEmpty({ message: 'The User name cannot be empty' })
    @IsString()
    name: string;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;

    roles: IRole[];
}
