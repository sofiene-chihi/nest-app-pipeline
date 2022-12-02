import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { CurrentUserPayload } from 'src/user/interfaces/currentUser.payload';
import { LoginResponse } from 'src/user/interfaces/login.response';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(payload: RegisterDto): Promise<LoginResponse> {
    const user: User = await this.userService.createUser(payload);
    return this.sign(user);
  }

  async login(payload: LoginDto): Promise<LoginResponse> {
    const user: User = await this.userService.loginUser(payload);
    return this.sign(user);
  }

  sign(user: User): LoginResponse {
    const infoToSign: CurrentUserPayload = {
      email: user.email,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(infoToSign),
    };
  }
}
