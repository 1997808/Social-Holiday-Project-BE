import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async checkUserExist(payload): Promise<boolean> {
    const { email } = payload;
    const user = await this.usersService.findOne({ email });
    if (user) {
      return true;
    }
    return false;
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;
    let result;
    const user = await this.usersService.findUserWithPassword(email);
    if (user) {
      if (await this.comparePassword(password, user.password)) {
        result = this.jwtService.sign({
          ...user,
        });
        return {
          user,
          accessToken: result,
        };
      }
    }
    return 'error';
  }

  async checkLogin(request) {
    try {
      if (request.headers.authorization) {
        const jwt = request.headers.authorization.replace('Bearer ', '');
        if (jwt !== 'null') {
          const data = await this.jwtService.verifyAsync(jwt);
          if (data) {
            const user = await this.usersService.findById(data.id);
            const { password, ...result } = user;
            return { user: result };
          }
        }
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  public async create(user: CreateUserDto) {
    if (await this.checkUserExist(user)) {
      return { message: 'User already existed' };
    } else {
      const pass = await this.hashPassword(user.password);
      const newUser = await this.usersService.create({
        ...user,
        password: pass,
      });
      if (newUser) {
        return { message: 'success' };
      } else {
        return { message: 'failed' };
      }
    }
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
