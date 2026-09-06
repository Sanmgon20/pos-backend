import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Productos')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  sku!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @Column({ default: 5 })
  stockMinimo!: number;

  @Column({ default: 1 })
  activo!: number;
}
