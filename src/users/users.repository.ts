import { Injectable } from '@nestjs/common';
import { CreateUserReqDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  InternalServerError,
  InternalServerMessage,
} from 'src/common/exception/internal.server';
import { Users } from 'src/common/entity/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOneUserByAccount(account: string): Promise<Users | null> {
    return await this.userRepository.findOneBy({ account });
  }

  async findOneUserById(userId: number): Promise<Users | null> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(createUserDto: CreateUserReqDto): Promise<void> {
    try {
      const user = Users.toUsersEntity(createUserDto);

      await this.userRepository.insert(user);
    } catch (error) {
      this.handleError();
    }
  }

  private handleError() {
    throw new InternalServerError(InternalServerMessage.DATABASE_ERROR);
  }
}
