import {
    Controller,
    Post,
    Body,
    HttpCode,
    UseInterceptors,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { ResHeaderTransformerInterceptor } from 'src/common/interceptors/headerTransform.interceptor';
import { User } from 'src/users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 200, type: User })
    @HttpCode(200)
    @Post('register')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    @UsePipes(ValidationPipe)
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Логинизация пользователя' })
    @ApiResponse({ status: 200, type: User })
    @HttpCode(200)
    @Post('login')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @ApiOperation({ summary: 'Сброс токена авторизации' })
    @ApiResponse({ status: 200 })
    @HttpCode(200)
    @Post('logout')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    logout() {
        return this.authService.logout();
    }
}
