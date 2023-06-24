import { Controller, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { TypedBody, TypedRoute } from '@nestia/core';
import { LoggerService } from 'src/logger/logger.service';
import { StatusResponse, ResultStatus } from 'src/kernel/model/api.response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * 고객의 회원가입 API
   *
   * @summary 고객의 회원가입 API
   *
   * @tag users
   *
   * @param createUserDto  고객의 회원가입시 필요한 정보
   *
   * @returns status 201, message가 success일때만 성공
   *
   * @throw 400 account duplicate
   *
   * @throw 500, sql error 발생시 실패
   *
   */
  @TypedRoute.Post()
  async create(@TypedBody() createUserDto: CreateUserDto) {
    this.logger.log(
      `유저 가입 정보 확인: ${JSON.stringify(createUserDto)}`,
      'UsersController',
    );

    await this.usersService.create(createUserDto);

    return new StatusResponse(HttpStatus.CREATED, ResultStatus.SUCCESS);
  }
}
