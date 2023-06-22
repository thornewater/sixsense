import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entity/users.entity';
import {
  InternalServerError,
  InternalServerMessage,
} from 'src/kernel/exception/internal.server';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOneUserByAccount(account: string): Promise<Users | null> {
    try {
      return this.userRepository.findOneBy({ account });
    } catch (error) {
      this.handleError();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      const user = Users.toUsersEntity(createUserDto);

      await this.userRepository.insert(user);
    } catch (error) {
      this.handleError();
    }
  }

  private handleError(): never {
    throw new InternalServerError(InternalServerMessage.DATABASE_ERROR);
  }
}