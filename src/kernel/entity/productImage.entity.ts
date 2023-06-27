import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity({ name: 'product_images' })
export class ProductImages {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ name: 'image_url', type: 'varchar', length: 2000 })
  imageUrl: string;

  @ManyToOne(() => Products, (product) => product.productImages)
  @JoinColumn({ name: 'product_id' })
  product: Products;
}
