import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from '../interface/role.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Role')
export class Role implements IRole {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn({
        comment: 'The role unique identifier',
    })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Ключевое слово, описывающее роль пользователя' })
    @Column()
    key: string;

    @ApiProperty({ example: 'Админ системы', description: 'Описание роли' })
    @Column()
    value: string;

}
