import { Controller, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import core from '@nestia/core';
import { Response } from 'express';
import { ResultStatus, StatusResponse } from 'src/common/model/api.response';
import { LoginReqDto, checkLoginReqDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원의 로그인 API
   *
   * API는 사용자가 계정과 비밀번호를 통해 로그인하는 기능을 제공
   * 로그인 성공 시, 쿠키를 통해 액세스 토큰을 반환
   *
   * @summary 고객의 로그인 API
   *
   * @tag users
   *
   * @param loginReqDto  로그인 요청 시 필요한 사용자 계정과 비밀번호 정보
   * 계정과 비밀번호는 모두 문자열 형태이며, 세부적인 정규표현식은 스키마를 참고
   *
   * @returns code 200 - 로그인에 성공하면 'success' 메시지와 함께 액세스 토큰을 담은 쿠키를 반환합니다.
   *
   * @throw  401 - 데이터베이스에 존재하지 않는 계정이거나 비밀번호가 일치하지 않는 경우 발생합니다.
   *
   * @throw  500 - SQL 에러가 발생한 경우
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
