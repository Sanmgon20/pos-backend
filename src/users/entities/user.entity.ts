import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface UserInMemory {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Entity('usuarios') // Nombre de la tabla en SQLite
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  legajo!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column()
  rol!: string;

  @Column({ default: 1 })
  activo!: number;
}
