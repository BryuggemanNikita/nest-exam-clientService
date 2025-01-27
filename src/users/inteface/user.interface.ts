import { IRole } from "src/roles/interface/role.interface";

export interface IUser {
    name: string;
    email: string;
    password: string;
    roles: IRole[]
}
