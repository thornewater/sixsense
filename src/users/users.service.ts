import { Injectable, LoggerService } from '@nestjs/common';
import {
  BadRequest,
  BadRequestMessage,
} from 'src/kernel/exception/bad.request';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkDuplicateAccount(createUserDto.account);

    createUserDto.password = await argon2.hash(createUserDto.password, {
      type: 2,
    });

    return await this.usersRepository.createUser(createUserDto);
  }

  private async checkDuplicateAccount(account: string) {
    const userInfo = await this.usersRepository.findOneUserByAccount(account);

    if (userInfo) {
      this.logger.error(
        `이미존재하는 계정입니다. account: ${account}`,
        new Error().stack,
        'UsersService',
      );

      throw new BadRequest(BadRequestMessage.DUPLICATE_ACCOUNT);
    }
  }
}
