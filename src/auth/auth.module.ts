import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/passport.jwt.strategy';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_SECRET_KEY'),
        signOptions: {
          issuer: config.get('ACCESS_ISSUER'),
          audience: config.get('ACCESS_AUDIENCE'),
          expiresIn: config.get('ACCESS_EXPIRES_MINUTES'),
          algorithm: config.get('ACCESS_ALGORITHM'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
