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

@Entity('User')
export class User implements IUser {
    @PrimaryGeneratedColumn({
        comment: 'The user unique identifier',
    })
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: IRole[];
}
