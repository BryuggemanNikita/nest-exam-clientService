import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/inteface/user.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly SALT = 9;
    constructor(private readonly usersService: UsersService) {}

    async register(createUserDto: CreateUserDto): Promise<IUser> {
        const candidat = await this.usersService.findByEmail(
            createUserDto.email,
        );
        if (candidat)
            throw new HttpException(
                {
                    message: 'User with this email already exists',
                    statusCode: 400,
                },
                HttpStatus.BAD_REQUEST,
            );
        const hashPassword = await bcrypt.hash(
            createUserDto.password,
            this.SALT,
        );
        const user = await this.usersService.create({
            ...createUserDto,
            password: hashPassword,
        });

        return user;
    }

    async login(loginUserDto: LoginUserDto): Promise<IUser> {
        const user = await this.validateUser({ ...loginUserDto });
        return user;
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<IUser> {
        const user = await this.usersService.findByEmail(loginUserDto.email);
        const truePassword = await bcrypt.compare(
            loginUserDto.password,
            user.password,
        );
        if (!truePassword) {
            throw new HttpException(
                {
                    message: 'Invalid password or email',
                    statusCode: 400,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }

    logout(): void {
        return;
    }
}
