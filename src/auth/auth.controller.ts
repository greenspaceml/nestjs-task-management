import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin()
  {
    // initiates the Google OAuth2 login flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res)
  {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect('http://localhost:4200/login/succes/' + jwt);
    else
      res.redirect('http://localhost:4200/login/failure');
  }

}
