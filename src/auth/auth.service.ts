import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;
    let result;
    const user = await this.usersService.findOne({ email })
    if (user) {
      if (await this.comparePassword(password, user.password)) {
        result = this.jwtService.sign({ id: user.userid, username: user.username })
        return {
          access_token: result,
        }
      }
    }
    return "error";
  }

  public async create(user: CreateUserDto) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.usersService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result);
    return { user: result, token };
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