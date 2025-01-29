import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/inteface/user.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly SALT = 9;
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto): Promise<{user: IUser, message: string}> {
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

        return {user, message:'Registration successful'};
    }

    async login(loginUserDto: LoginUserDto): Promise<{ token: string, message: string }> {
        const user = await this.validateUser({ ...loginUserDto });
        return { token: this.generateToken(user), message: "Login successful" };
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<IUser> {
        const user = await this.usersService.findByEmail(loginUserDto.email);

        if (!user) {
            throw new HttpException(
                {
                    message: `User with email:${user.email} not found`,
                    satusCode: 404,
                },
                HttpStatus.NOT_FOUND,
            );
        }

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

    private generateToken(user: IUser): string {
        const userrole = user.roles
        const payload = { userrole };
        return this.jwtService.sign(payload, { expiresIn: '1h' }); // Токен истекает через 1 час
    }

    logout(): void {
        return;
    }
}
