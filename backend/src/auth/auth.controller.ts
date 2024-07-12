import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body()  loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);
    if (user) {
      return this.authService.login(user);
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  }

  @Post('register')
  async register(@Body()  registerDto: RegisterDto) {
    const { email, password , username  } = registerDto;
    
    return this.authService.register(email, password , username); 
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
