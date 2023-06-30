import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { LoggerService } from 'src/common/logger/logger.service';
import { CreateOrderReqDto } from './dto/order.dto';
import { Users } from 'src/common/entity/users.entity';
import {
  Forbidden,
  ForbiddenMessage,
} from 'src/common/exception/forbidden.exception';
import { orderStatusEnum } from 'src/common/entity/orderStatus.entity';
import { CartsRepository } from 'src/carts/carts.repository';
import { NotFound, NotFoundMessage } from 'src/common/exception/not.found';
import { Carts } from 'src/common/entity/carts.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(user: Users, createOrderDto: CreateOrderReqDto) {
    const { carts, totalPrice } = createOrderDto;
    const statusId = orderStatusEnum.confirm;

    if (user.point < totalPrice) {
      throw new Forbidden(ForbiddenMessage.NOT_ENOUGH_POINT);
    }

    const cartIds = carts.map((cart) => cart.cartId);

    const cartsInDatabase = await this.cartsRepository.findByIds(cartIds);

    this.validateCartIds(cartIds, cartsInDatabase);

    const cartItems = carts.map((cart) => [cart.productId, cart.quantity]);

    this.validateCartItems(cartItems, cartsInDatabase);

    await this.ordersRepository.create(
      user.id,
      statusId,
      totalPrice,
      cartIds,
      cartItems,
    );
  }

  validateCartIds(cartIds: number[], cartsInDatabase: Carts[]) {
    if (cartsInDatabase.length !== cartIds.length) {
      this.logger.error(
        `${NotFoundMessage.NOT_FOUND_CARTID}`,
        new Error().stack,
        'OrderService',
      );

      throw new NotFound(NotFoundMessage.NOT_FOUND_CARTID);
    }
  }

  validateCartItems(cartItems: number[][], cartsInDatabase: Carts[]) {
    const cartsProductId = cartsInDatabase.map((cart) => cart.productId).sort();
    const cartItemsProductId = cartItems.map((item) => item[0]).sort();

    const areProductIdsSame = cartsProductId.every(
      (id, index) => id === cartItemsProductId[index],
    );

    if (!areProductIdsSame) {
      this.logger.error(
        `${NotFoundMessage.NOT_FOUND_PRODUCTID}`,
        new Error().stack,
        'OrderService',
      );

      throw new NotFound(NotFoundMessage.NOT_FOUND_PRODUCTID);
    }
  }
}
