import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios') // Nombre de la tabla en SQLite
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  legajo!: number;

  @Column()
  name!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column()
  rol!: string;

  @Column({ default: 1 })
  activo!: number;
}
