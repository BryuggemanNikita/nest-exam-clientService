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

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(201)
    @Post('register')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    @UsePipes(ValidationPipe)
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @HttpCode(200)
    @Post('login')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @HttpCode(200)
    @Post('logout')
    @UseInterceptors(ResHeaderTransformerInterceptor)
    logout() {
        return this.authService.logout();
    }
}
