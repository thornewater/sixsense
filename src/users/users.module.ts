import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { UsersRepository } from './users.repository';
import { Users } from 'src/kernel/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
