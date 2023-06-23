import { Column, Entity, Unique } from 'typeorm';
import { CommonEntity } from './common.entity';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Entity({ name: 'users' })
@Unique(['account'])
export class Users extends CommonEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  account: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 30 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 30 })
  birthday: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    default: 100000,
  })
  point: number;

  static toUsersEntity(userCreateDto: CreateUserDto) {
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
