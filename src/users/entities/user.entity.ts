import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { IUser } from '../inteface/user.interface';
import { Role } from 'src/roles/entities/role.entity';
import { IRole } from 'src/roles/interface/role.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('User')
export class User implements IUser {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn({
        comment: 'The user unique identifier',
    })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Почта пользователя' })
    @Column()
    email: string;

    @ApiProperty({ example: 'Jhon', description: 'Имя пользователя' })
    @Column()
    name: string;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    @Column()
    password: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: IRole[];
}
