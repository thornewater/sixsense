import { Controller, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReqDto, checkCreateUserDto } from './dto/user.dto';
import { TypedBody, TypedRoute } from '@nestia/core';
import { StatusResponse, ResultStatus } from 'src/Common/model/api.response';
import { LoggerService } from 'src/Common/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * 고객의 회원가입 API
   *
   * 이 API는 고객이 회원으로 등록하기 위해 필요한 기능을 제공합니다.
   * 클라이언트에서 제공하는 사용자 정보를 바탕으로 사용자의 계정을 생성합니다.
   *
   * @summary 고객의 회원가입 API
   *
   * @tag users
   *
   * @param createUserDto  회원가입시 필요한 고객 정보
   *
   * @returns code 201 - message가 'success'인 경우에만 API 호출이 성공함을 의미
   *
   * @throw statusCode 400 - 클라이언트에서 제공한 account가 데이터베이스에 이미 존재하는 경우
   *
   * @throw statusCode 500 - SQL 에러가 발생한 경우
   *
   */
  @TypedRoute.Post()
  async create(@TypedBody() createUserDto: CreateUserReqDto) {
    checkCreateUserDto(createUserDto);

    await this.usersService.create(createUserDto);

    return new StatusResponse(HttpStatus.CREATED, ResultStatus.SUCCESS);
  }
}
