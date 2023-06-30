import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Incenses } from './incenses.entity';
import { Categories } from './categories.entity';
import { ProductImages } from './productImage.entity';
import { Carts } from './carts.entity';

@Entity({ name: 'products' })
export class Products extends CommonEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  price: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({
    name: 'detail_image',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  detailImage: string | null;

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
}
