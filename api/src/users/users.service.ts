import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'output/entities/Usuarios';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuarios) private usersRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    return this.usersRepository.find();
  }

  async createUser(userData: Partial<Usuarios>): Promise<Usuarios> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }
}
