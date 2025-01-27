import { IsNotEmpty, IsString } from 'class-validator';
import { IRole } from '../interface/role.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto implements IRole {
    @ApiProperty({ example: 'ADMIN', description: 'Ключевое слово, описывающее роль пользователя' })
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty({ example: 'Админ системы', description: 'Описание роли' })
    @IsNotEmpty()
    @IsString()
    value: string;
}
