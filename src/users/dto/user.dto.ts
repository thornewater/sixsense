import { Users } from 'src/common/entity/users.entity';
import typia from 'typia';

export const checkCreateUserDto = typia.createAssertEquals<CreateUserReqDto>();
export const checkLoginReqDto = typia.createAssertEquals<LoginReqDto>();

export type CreateUserReqDto = Pick<
  Users,
  'name' | 'account' | 'password' | 'phoneNumber' | 'birthday' | 'gender'
>;

export type LoginReqDto = Pick<Users, 'account' | 'password'>;
