import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users } from 'src/Common/entity/users.entity';
import { LoggerModule } from 'src/Common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
