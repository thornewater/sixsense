import { Users } from 'src/entity/users.entity';
import typia from 'typia';

export const checkCreateUserDto = typia.createIs<Users>();

export type CreateUserReqDto = Pick<
  Users,
  'name' | 'account' | 'password' | 'phoneNumber' | 'birthday' | 'gender'
>;

export type LoginReqDto = Pick<Users, 'account' | 'password'>;
