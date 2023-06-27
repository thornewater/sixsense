import { Users } from '../entity/users.entity';

export interface RequestWithUser extends Request {
  user: Users;
}
