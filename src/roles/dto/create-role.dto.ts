import { IsNotEmpty, IsString } from 'class-validator';
import { IRole } from '../interface/role.interface';

export class CreateRoleDto implements IRole {
    @IsNotEmpty()
    @IsString()
    key: string;

    @IsNotEmpty()
    @IsString()
    value: string;
}
