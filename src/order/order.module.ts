import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Orders } from 'src/common/entity/order.entity';
import { OrderItems } from 'src/common/entity/orderItems.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from 'src/common/entity/orderStatus.entity';
import { OrderRepository } from './order.repository';
import { LoggerModule } from 'src/common/logger/logger.module';
import { UsersModule } from 'src/users/users.module';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderItems, OrderStatus]),
    LoggerModule,
    UsersModule,
    CartsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
