/**
 * 유저의 회원가입정보를 담고있는 DTO
 */
export interface CreateUserDto {
  /**
   * 유저의 본명
   *
   * @type string
   *
   */
  name: string;

  /**
   * 유저의 계정
   * 영문 및 숫자 4~12글자이여합니다
   *
   * @pattern ^[a-z0-9]{4,12}$
   *
   */
  account: string;

  /**
   * 유저의 비밀번호
   * 영문,숫자 및 특수문자가 포함되어야하며 8~16글자여야합니다.
   *
   * @pattern ^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$
   *
   */
  password: string;

  /**
   * 유저의 휴대폰번호
   *
   * @type string
   *
   *
   */
  phoneNumber: string;

  /**
   * 유저의 생년월일
   *
   *
   *@type string
   *@format date: YYYY-MM-DD
   *
   */
  birthday: string;

  /**
   * 유저의 성별
   * @type string
   *
   */
  gender: string;

  /**
   * 유저의 회원가입정보를 담고있는 DTO
   */
}
