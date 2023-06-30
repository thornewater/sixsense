import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from './order.entity';
import { Products } from './products.entity';

@Entity({ name: 'order_items' })
export class OrderItems {
  /**
   * 주문아이템 PK
   *
   */
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  /**
   * 주문 아이템의 수량.
   * 해당 주문에서 구매한 해당 제품의 수량
   *
   * @type uint
   */
  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId: number;

  @Column({ name: 'product_id', type: 'int' })
  productId: number;

  @ManyToOne(() => Orders, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  @ManyToOne(() => Products, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  products: Products;
}
