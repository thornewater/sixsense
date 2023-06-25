import { Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/user.dto';
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

  async findOneUserById(userId: number): Promise<Users | null> {
    try {
      return this.userRepository.findOne({ where: { id: userId } });
    } catch (error) {
      this.handleError();
    }
  }

  async createUser(createUserDto: CreateUserReqDto): Promise<void> {
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
