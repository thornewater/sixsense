import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Products } from './products.entity';
import { CommonEntity } from './common.entity';
import { NewCartDto } from 'src/carts/dto/cart.dto';

@Entity('carts')
export class Carts extends CommonEntity {
  /**
   * 카트에 담긴 상품의 퀀티티
   *
   * @type uint
   * @minimum 1
   *
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * 유저의 Id
   *
   * @type int
   * @minimum 1
   *
   */
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  /**
   * 유저의 Id
   *
   * @type int
   * @minimum 1
   *
   */
  @Column({ name: 'product_id', type: 'int' })
  productId: number;

  @ManyToOne(() => Users, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Products, (product) => product.carts)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  static toCartsEntity(createCartDto: NewCartDto, userId: number): Carts {
    const cart: Carts = new Carts();
    cart.quantity = createCartDto.quantity;
    cart.productId = createCartDto.productId;
    cart.userId = userId;
    return cart;
  }
}
