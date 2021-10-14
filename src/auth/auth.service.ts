import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    if (authCredentialsDto.isGoogleSignUp) {
      return this.signInWithSocial(authCredentialsDto);
    }
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username: username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username: username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }

  async signInWithSocial(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username } = authCredentialsDto;
    // Generate password start ---
    const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const pwdLen = 10;
    const randPassword = Array(pwdLen).fill(pwdChars).map((x) => {
      return x[Math.floor(Math.random() * x.length)];
    }).join('');
    // Generate password end ---
    authCredentialsDto.password = randPassword;
    // Create account
    await this.userRepository.createUser(authCredentialsDto);
    const user = await this.userRepository.findOne({ username: username });
    if (user) {
      const payload: JwtPayload = { username: username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }
}
