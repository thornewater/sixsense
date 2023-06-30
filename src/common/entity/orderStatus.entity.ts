import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orders } from './order.entity';

@Entity({ name: 'order_status' })
export class OrderStatus {
  /**
   * 주문 상태 PK
   *
   * @type int
   */
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  /**
   * 주문 상태
   * 주문 상태에 대한 설명
   *
   * @type string
   * @maxLength 50
   */
  @Column({ type: 'varchar', length: 50 })
  status: string;

  @OneToMany(() => Orders, (order) => order.statusId)
  orders: Orders[];
}

export enum orderStatusEnum {
  pending = 1,
  confirm = 2,
}
