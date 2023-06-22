import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'incenses' })
export class Incenses {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;
}
