import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('Взаимодействие с ролями')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 201, type: Role })
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @ApiOperation({ summary: 'Получение всех ролей из бд' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @ApiOperation({ summary: 'Получение роли по ключу' })
    @ApiResponse({ status: 200, type: Role })
    @Get(':key')
    findByKey(@Param('key') key: string) {
        return this.rolesService.findByKey(key);
    }

    @ApiOperation({ summary: 'Удаление роли по id' })
    @ApiResponse({ status: 204 })
    @Delete(':key')
    remove(@Param('key') key: string) {
        return this.rolesService.remove(key);
    }
}
