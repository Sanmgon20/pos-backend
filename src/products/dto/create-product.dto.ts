/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  sku!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  stock!: number;

  @IsNumber()
  @IsNotEmpty()
  stockMinimo!: number;

  @IsNumber()
  @IsOptional()
  activo?: number;
}
