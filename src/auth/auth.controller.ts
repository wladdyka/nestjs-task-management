import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  signUp(@Body() credsDto: AuthCredentialsDto): Promise<void> {
    return this.service.signUp(credsDto);
  }

  @Post('signin')
  signIn(
    @Body() credsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.service.signIn(credsDto);
  }
}
