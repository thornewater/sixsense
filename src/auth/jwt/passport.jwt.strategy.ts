import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  UnAuthorized,
  UnAuthorizedMessage,
} from 'src/common/exception/unauthorized.exception';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.signedCookies?.accessToken;
        },
      ]),
      secretOrKey: config.get('ACCESS_SECRET_KEY'),
      algorithms: config.get('ACCESS_ALGORITHM'),
      issuer: config.get('ACCESS_ISSUER'),
      audience: config.get('ACCESS_AUDIENCE'),
    });
  }

  async validate(payload: { userId: number }) {
    const { userId } = payload;

    const user = await this.usersRepository.findOneUserById(userId);

    if (!user) {
      throw new UnAuthorized(UnAuthorizedMessage.WRONG_TOKEN);
    }

    return user;
  }
}
