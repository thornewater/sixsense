import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { CreateUserReqDto } from 'src/users/dto/user.dto';
import { Carts } from './carts.entity';
import { Orders } from './order.entity';

@Entity({ name: 'users' })
@Unique(['account'])
export class Users extends CommonEntity {
  /**
   * 유저의 본명
   *
   * @type string
   * @minLength 1
   * @maxLength 50
   *
   */
  @Column({ type: 'varchar', length: 50 })
  name: string;

  /**
   * 유저의 계정
   * 영문 및 숫자 4~12글자이여합니다
   *
   * @pattern ^[a-z0-9]{4,12}$
   */
  @Column({ type: 'varchar', length: 50 })
  account: string;

  /**
   * 유저의 비밀번호
   * 영문,숫자 및 특수문자가 포함되어야하며 8~16글자여야합니다.
   * @type string
   * @pattern ^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$
   * @minLength 1
   * @maxLength 200
   */
  @Column({ type: 'varchar', length: 200 })
  password: string;

  /**
   * 유저의 휴대폰번호 01012345678
   *
   * @type string
   * @pattern ^010\d{8}$
   * @minLength 1
   * @maxLength 30
   */
  @Column({ name: 'phone_number', type: 'varchar', length: 30 })
  phoneNumber: string;

  /**
   * 유저의 생년월일
   *
   * @type string
   * @pattern ^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$
   * @minLength 1
   * @maxLength 30
   */
  @Column({ type: 'varchar', length: 30 })
  birthday: string;

  /**
   * 유저의 성별
   *
   * @type string
   * @minLength 1
   * @maxLength 10
   */
  @Column({ type: 'varchar', length: 10 })
  gender: string;

  /**
   * 유저의포인트
   *
   * @type unit
   * @default 100000
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 100000,
  })
  point: number;

  @OneToMany(() => Carts, (cart) => cart.userId)
  carts: Carts[];

  @OneToMany(() => Orders, (order) => order.userId)
  orders: Orders[];

  static toUsersEntity(userCreateDto: CreateUserReqDto): Users {
    const user: Users = new Users();
    user.name = userCreateDto.name;
    user.account = userCreateDto.account;
    user.password = userCreateDto.password;
    user.phoneNumber = userCreateDto.phoneNumber;
    user.birthday = userCreateDto.birthday;
    user.gender = userCreateDto.gender;
    return user;
  }
}
