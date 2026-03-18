import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(data: any): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });
    return this.usersRepository.save(user as any) as Promise<User>;
  }

  async login(data: any): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatched = await bcrypt.compare(data.password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...result } = user;
    return result;
  }
}
