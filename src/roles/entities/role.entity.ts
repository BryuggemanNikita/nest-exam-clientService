import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from '../interface/role.interface';

@Entity('Role')
export class Role implements IRole {
    @PrimaryGeneratedColumn({
        comment: 'The role unique identifier',
    })
    id: number;

    @Column()
    value: string;

    @Column()
    key: string;
}
