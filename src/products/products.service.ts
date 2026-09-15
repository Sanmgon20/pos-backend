import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepo.create(createProductDto);
    return await this.productRepo.save(newProduct);
  }

  // Único método findOne que busca por ID, SKU o Nombre
  async findOne(termino: string | number): Promise<Product> {
    const terminoString = String(termino);
    const esNumero = !isNaN(Number(terminoString));

    const product = await this.productRepo.findOne({
      where: esNumero
        ? [
            { id: Number(terminoString), activo: 1 },
            { sku: Number(terminoString), activo: 1 },
          ]
        : [{ name: Like(`%${terminoString}%`), activo: 1 }],
    });

    if (!product) {
      throw new NotFoundException(`Producto "${termino}" no encontrado`);
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id); // Reutilizamos findOne para verificar existencia
    Object.assign(product, updateProductDto);
    return await this.productRepo.save(product);
  }
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}
