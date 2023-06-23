import { Injectable } from '@nestjs/common';
import {
  UnAuthorized,
  UnAuthorizedMessage,
} from 'src/kernel/exception/unauthorized.exception';
import { LoggerService } from 'src/logger/logger.service';
import { UsersRepository } from 'src/users/users.repository';
import * as argon2 from 'argon2';
import { Payload } from './jwt/tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { account, password } = loginReqDto;

    const user = await this.usersRepository.findOneUserByAccount(account);

    if (!user || !(await this.isValidPassword(user.password, password))) {
      const errorMessage = `올바르지 않은 계정과 비밀번호입니다.`;

      this.logger.error(errorMessage, new Error().stack, 'AuthService');

      throw new UnAuthorized(UnAuthorizedMessage.WRONG_ACCOUNT_PASSWORD);
    }

    const payload: Payload = { account: user.account, userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { token: accessToken };
  }

  private async isValidPassword(hashedPassword: string, password: string) {
    return argon2.verify(hashedPassword, password, { type: 2 });
  }
}
