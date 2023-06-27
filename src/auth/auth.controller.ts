import { Controller, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import core from '@nestia/core';
import { Response } from 'express';
import { ResultStatus, StatusResponse } from 'src/kernel/model/api.response';
import { LoginReqDto, checkLoginReqDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 고객의 로그인 API
   *
   * @summary 고객의 로그인 API
   *
   * @tag users
   *
   * @param loginReqDto  고객의 회원가입시 필요한 정보
   * account 와 password가 필요. 각각 string타입이며 세부 정규표현식은 스키마참고
   *
   * @returns 200, message가 success일때만 성공 하며 쿠키로 accessToken전달
   *
   * @throw 401 유저 account 및 password db에 존재하지않거나 다른경우
   *
   * @throw 500, sql error 발생시 실패
   *
   */
  @core.TypedRoute.Post()
  async login(
    @core.TypedBody() loginReqDto: LoginReqDto,
    // passthrough: Express의 Response 객체를 받아오고, NestJS의 자동 응답 처리 기능 활용
    @Res({ passthrough: true }) res: Response,
  ) {
    checkLoginReqDto(loginReqDto);

    const accessToken = await this.authService.login(loginReqDto);

    res.cookie('accessToken', accessToken.token, {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    return new StatusResponse(HttpStatus.OK, ResultStatus.SUCCESS);
  }
}
