import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './inteface/user.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly rolesService: RolesService
    ) {}

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const user: IUser = this.userRepository.create(createUserDto);
        const userRole = await this.rolesService.findByKey('USER');
        user.roles = [userRole]
        console.log(user);
        
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<IUser[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<IUser> {
        const user = await this.userRepository.findOneBy({ id }).catch(() => {
            throw new HttpException(
                { message: `User with id:${id} not found`, satusCode: 404 },
                HttpStatus.NOT_FOUND,
            );
        });
        return user;
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await this.userRepository
            .findOne({ where: { email: email } })
            .catch(() => {
                throw new HttpException(
                    {
                        message: `User with email:${email} not found`,
                        satusCode: 404,
                    },
                    HttpStatus.NOT_FOUND,
                );
            });
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
        await this.userRepository.update(id, updateUserDto).catch(() => {
            throw new HttpException(
                { message: 'Bad Request', statusCode: 400 },
                HttpStatus.BAD_REQUEST,
            );
        });
        return this.findOne(id);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
