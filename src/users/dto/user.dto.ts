import { Users } from 'src/common/entity/users.entity';

export type CreateUserReqDto = Pick<
  Users,
  'name' | 'account' | 'password' | 'phoneNumber' | 'birthday' | 'gender'
>;

export type LoginReqDto = Pick<Users, 'account' | 'password'>;
