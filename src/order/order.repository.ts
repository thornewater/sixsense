import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/common/entity/carts.entity';
import { Orders } from 'src/common/entity/order.entity';
import { OrderItems } from 'src/common/entity/orderItems.entity';
import {
  InternalServerError,
  InternalServerMessage,
} from 'src/common/exception/internal.server';
import { NotFound, NotFoundMessage } from 'src/common/exception/not.found';
import { LoggerService } from 'src/common/logger/logger.service';
import { UsersRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';

export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(
    userId: number,
    statusId: number,
    totalPrice: number,
    cartIds: number[],
    cartItems: number[][],
  ) {
    const queryRunner =
      this.ordersRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const order = Orders.toOrdersEntity(userId, statusId, totalPrice);

      const createdOrder = await queryRunner.manager.save(order);

      const orderItems = cartItems.map((item) => {
        const orderItem = new OrderItems();
        orderItem.orderId = createdOrder.id;
        orderItem.productId = item[0];
        orderItem.quantity = item[1];
        return orderItem;
      });
      await queryRunner.manager.save(orderItems);

      const user = await this.usersRepository.findOneUserById(userId);

      if (!user) {
        throw new NotFound(NotFoundMessage.NOT_FOUND_USER);
      }

      user.point -= totalPrice;

      await queryRunner.manager.save(user);

      for (const id of cartIds) {
        const deleteResult = await queryRunner.manager.delete(Carts, {
          id: id,
        });
        if (deleteResult.affected === 0) {
          throw new NotFound(NotFoundMessage.NO_DELETE_RECORD);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(
        `${InternalServerMessage.DATABASE_ERROR}`,
        new Error().stack,
        'OrderRepository',
      );

      throw new InternalServerError(InternalServerMessage.DATABASE_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
