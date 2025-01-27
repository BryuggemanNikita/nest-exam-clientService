import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole } from './interface/role.interface';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) { }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.rolesRepository.create(createRoleDto);
        return await this.rolesRepository.save(role);
    }

    async findAll(): Promise<IRole[]> {
        return await this.rolesRepository.find();
    }

    async findByKey(key: string): Promise<Role> {
        const role = await this.rolesRepository.findOneBy({ key });
        if (!role) {
            throw new NotFoundException(`Role with key: ${key} is not found`);
        }
        return role;
    }

    async remove(key: string): Promise<void> {
        const removeRes = await this.rolesRepository.delete({ key });
        if (removeRes.affected === 0) {
            throw new NotFoundException(`Role with key: ${key} is not found`)
        }
    }
}
