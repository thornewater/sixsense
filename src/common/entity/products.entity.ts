import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Incenses } from './incenses.entity';
import { Categories } from './categories.entity';
import { ProductImages } from './productImage.entity';
import { Carts } from './carts.entity';
import { OrderItems } from './orderItems.entity';

@Entity({ name: 'products' })
export class Products extends CommonEntity {
  /**
   * 제품 이름.
   *
   * @maxLength 50
   */
  @Column({ type: 'varchar', length: 50 })
  name: string;

  /**
   * 제품 가격.
   */
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  price: number;

  /**
   * 제품 설명.
   *
   * @maxLength 200
   */
  @Column({ type: 'varchar', length: 200 })
  description: string;

  /**
   * 제품 재고.
   *
   * @type uint
   */
  @Column({ type: 'int' })
  stock: number;

  /**
   * 제품의 상세 이미지 URL.
   * Nullable로, 해당 값이 없을 수도 있습니다.
   *
   * @maxLength 2000
   */
  @Column({
    name: 'detail_image',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  detailImage: string | null;

  /**
   * 제품의 할인율.
   * 기본값은 0
   */
  @Column({
    name: 'discount_rate',
    type: 'decimal',
    precision: 6,
    scale: 5,
    default: 0,
  })
  discountRate: number;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Incenses, (Incenses) => Incenses.product, {
    nullable: true,
  })
  @JoinColumn({ name: 'incenses_id' })
  incense: Incenses | null;

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  productImages: ProductImages[];

  @OneToMany(() => Carts, (cart) => cart.productId)
  carts: Carts[];

  @OneToMany(() => OrderItems, (orderItem) => orderItem.productId)
  orderItems: OrderItems[];
}
