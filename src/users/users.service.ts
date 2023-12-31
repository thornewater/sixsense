import { Injectable } from '@nestjs/common';
import {
  BadRequest,
  BadRequestMessage,
} from 'src/common/exception/bad.request';
import { CreateUserReqDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';
import * as argon2 from 'argon2';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserReqDto) {
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
