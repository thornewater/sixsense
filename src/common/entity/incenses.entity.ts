import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './products.entity';

@Entity({ name: 'incenses' })
export class Incenses {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Products, (Products) => Products.incense)
  product: Products;
}
