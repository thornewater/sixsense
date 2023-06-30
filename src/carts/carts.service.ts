import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CartDeleteDto, NewCartDto, UpdatedCartDto } from './dto/cart.dto';
import { ProductsRepository } from 'src/products/products.repository';
import {
  BadRequest,
  BadRequestMessage,
} from 'src/Common/exception/bad.request';
import { CartRaw, Carts } from './dto/response.type';
import { NotFound, NotFoundMessage } from 'src/Common/exception/not.found';
import { LoggerService } from 'src/Common/logger/logger.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(createCartDto: NewCartDto, userId: number) {
    await this.validateProduct(createCartDto.productId);

    await this.cartsRepository.create(createCartDto, userId);
  }

  async findAllByUserId(userId: number) {
    const cartItems = await this.cartsRepository.getAllCartsByUserId(userId);

    return this.transformCartItems(cartItems);
  }

  async deleteByCartId(cartIdDto: CartDeleteDto, userId: number) {
    const cartIds = this.parseCartIds(cartIdDto);

    await this.deleteCarts(cartIds, userId);

    return await this.findAllByUserId(userId);
  }

  async updateCartQuantity(updateCartInfo: UpdatedCartDto, userId: number) {
    const { cartId, quantity } = updateCartInfo;
    await this.cartsRepository.updateCartQuantity(cartId, quantity, userId);

    return await this.findAllByUserId(userId);
  }

  private async validateProduct(productId: number) {
    const product = await this.productsRepository.findOneByProductId(productId);

    if (!product) {
      this.logger.error(
        `${BadRequestMessage.PRODUCT_ID_NOT_FOUND} productId: ${productId}`,
        new Error().stack,
        'CartsService',
      );
      throw new BadRequest(BadRequestMessage.PRODUCT_ID_NOT_FOUND);
    }

    return product;
  }

  private transformCartItems(cartItems: CartRaw): Carts {
    return cartItems.map((cart) => ({
      ...cart,
      cartQuantity: Number(cart.cartQuantity),
      productPrice: Number(cart.productPrice),
      discountedPrice: Number(cart.discountedPrice),
      discountRate: Number(cart.productDiscountRate),
      userPoint: Number(cart.userPoint),
    }));
  }

  private parseCartIds(cartIdDto: CartDeleteDto): number[] {
    return cartIdDto.cartIdList[0]
      ? cartIdDto.cartIdList[0].split(',').map(Number)
      : cartIdDto.cartIdList.map(Number);
  }

  private async deleteCarts(cartIds: number[], userId: number) {
    const deleteResult = await this.cartsRepository.deleteCartsByCartIds(
      cartIds,
      userId,
    );

    if (deleteResult.affected === 0) {
      this.logger.error(
        `${NotFoundMessage.NO_DELETE_RECORD}`,
        new Error().stack,
        'CartsService',
      );

      throw new NotFound(NotFoundMessage.NO_DELETE_RECORD);
    }
  }
}
