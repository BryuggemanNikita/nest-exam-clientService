import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get(':key')
    findByKey(@Param('key') key: string) {
        return this.rolesService.findByKey(key);
    }

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Delete(':key')
    remove(@Param('key') key: string) {
        return this.rolesService.remove(key);
    }
}
