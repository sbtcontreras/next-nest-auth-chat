import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, loginSchema, RegisterDTO, registerSchema } from './auth.dto';
import { ZodValidationPipe } from 'src/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDTO) {
    return this.authService.register(body);
  }
}
