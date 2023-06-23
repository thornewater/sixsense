import typia from 'typia';

export const checkCreateUserDto = typia.createIs<CreateUserDto>();

/**
 * 유저의 회원가입정보를 담고있는 DTO
 */
export interface CreateUserDto {
  /**
   * 유저의 본명
   *
   * @type string
   */
  name: string;

  /**
   * 유저의 계정
   * 영문 및 숫자 4~12글자이여합니다
   *
   * @pattern ^[a-z0-9]{4,12}$
   */
  account: string;

  /**
   * 유저의 비밀번호
   * 영문,숫자 및 특수문자가 포함되어야하며 8~16글자여야합니다.
   *
   * @pattern ^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$
   */
  password: string;

  /**
   * 유저의 휴대폰번호 01012345678
   *
   * @type string
   * @pattern ^010\d{8}$
   */
  phoneNumber: string;

  /**
   * 유저의 생년월일
   *
   * @type string
   * @pattern ^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$
   */
  birthday: string;

  /**
   * 유저의 성별
   *
   * @type string
   */
  gender: string;

  /**
   * 유저의 회원가입정보를 담고있는 DTO
   */
}
