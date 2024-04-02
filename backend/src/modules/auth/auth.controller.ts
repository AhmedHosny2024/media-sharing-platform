import { Body, Controller, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/signin.dto';
import { CreateUserDTO } from 'src/modules/user/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() userlogin: SignInDTO) {
        const user = await this.authService.validateUser(
          userlogin.email,
          userlogin.password,
        );
    
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        return this.authService.login(user);
      }
    
    @Post('signup')
    async signup(@Body() user: CreateUserDTO) {
        console.log(user);
        return this.authService.signup(user);
    }

    @Post('logout')
    async logout() {
        return { message: 'Logged out successfully.' };
    }
    
}
