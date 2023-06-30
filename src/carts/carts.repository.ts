import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/common/entity/carts.entity';
import { EntityManager, Repository, In } from 'typeorm';
import { CartRaw } from './dto/response.type';
import { NewCartDto } from './dto/cart.dto';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(newCartInfo: NewCartDto, userId: number) {
    const existingCart = await this.findCartByProductAndUser(
      newCartInfo.productId,
      userId,
    );

    if (!existingCart) {
      const newCart = Carts.toCartsEntity(newCartInfo, userId);

      await this.cartsRepository.insert(newCart);
    } else {
      await this.updateCartQuantity(
        existingCart.id,
        newCartInfo.quantity,
        userId,
      );
    }
  }

  async findCartByProductAndUser(productId: number, userId: number) {
    return this.cartsRepository.findOne({
      where: { productId, userId },
    });
  }

  async getAllCartsByUserId(userId: number): Promise<CartRaw> {
    const productImagesSubQuery = this.createProductImagesSubQuery();
    const userCartItems: CartRaw = await this.createUserCartsQuery(
      productImagesSubQuery,
      userId,
    );

    return userCartItems;
  }

  private createProductImagesSubQuery() {
    return this.entityManager
      .createQueryBuilder()
      .select('JSON_ARRAYAGG(product_images.image_url)', 'productImages')
      .from('product_images', 'product_images')
      .where('product_images.product_id = carts.product_id')
      .groupBy('product_images.product_id')
      .getQuery();
  }

  private createUserCartsQuery(productImagesSubQuery: string, userId: number) {
    return this.cartsRepository
      .createQueryBuilder('carts')
      .select([
        'carts.id AS cartId',
        'carts.product_id AS productId',
        'carts.quantity AS cartQuantity',
        'products.name AS productName',
        'products.price AS productPrice',
        'products.discount_rate AS productDiscountRate',
        'carts.quantity AS productQuantity',
        'carts.user_id AS userId',
        'users.point AS userPoint',
        'CASE WHEN products.discount_rate > 0 THEN products.price * (1 - products.discount_rate) ELSE products.price END AS discountedPrice',
      ])
      .addSelect(`(${productImagesSubQuery})`, 'productImages')
      .innerJoin('products', 'products', 'products.id = carts.product_id')
      .innerJoin('users', 'users', 'carts.user_id = users.id')
      .where('carts.user_id = :userId', { userId })
      .getRawMany();
  }

  async deleteCartsByCartIds(cartIds: number[], userId: number) {
    return this.cartsRepository.delete({
      userId,
      id: In(cartIds),
    });
  }

  async updateCartQuantity(cartId: number, quantity: number, userId: number) {
    await this.cartsRepository.update(
      { id: cartId, userId },
      { quantity: quantity },
    );
  }

  async findByIds(cartIds: number[]) {
    return this.cartsRepository.find({
      where: { id: In(cartIds) },
    });
  }

  async remove(cartIds: number[]) {
    await this.cartsRepository.delete({ id: In(cartIds) });
  }
}
