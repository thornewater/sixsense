import {
  ManyToOne,
  Column,
  JoinColumn,
  Entity,
  OneToMany,
  Generated,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { Users } from './users.entity';
import { OrderStatus } from './orderStatus.entity';
import { OrderItems } from './orderItems.entity';

@Entity({ name: 'orders' })
export class Orders extends CommonEntity {
  /**
   * 주문한 사용자 ID
   *
   * @type int
   */
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  /**
   * 주문 상태 ID
   *
   * @type int
   */
  @Column({ name: 'status_id', type: 'int' })
  statusId: number;

  /**
   * 주문 번호
   * UUID를 사용하여 고유하게 생성
   *
   * @format uuid
   * @maxLength 50
   */
  @Column({
    name: 'order_number',
    type: 'varchar',
    length: 50,
    default: 'uuid()',
  })
  @Generated('uuid')
  orderNumber: string;

  /**
   * 총 주문 가격
   * 소수점 아래 세 자리까지 저장
   *
   * @type decimal
   * @precision 10
   * @scale 3
   */
  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 3 })
  totalPrice: number;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: 'status_id' })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.orderId)
  orderItems: OrderItems[];

  static toOrdersEntity(userId: number, statusId: number, totalPrice: number) {
    const order = new Orders();
    order.userId = userId;
    order.statusId = statusId;
    order.totalPrice = totalPrice;
    return order;
  }
}
