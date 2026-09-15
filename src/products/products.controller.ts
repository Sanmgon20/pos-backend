import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products') // La ruta base será http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. POST /Products (Crear producto)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  // 2. GET /products (Listar todos los productos)
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // 3. GET /products/1 (Buscar producto por ID)
  @Get(':termino')
  async findOne(@Param('termino') termino: string): Promise<Product> {
    return await this.productsService.findOne(termino);
  }

  // 4. PATCH /products/1 (Actualizar producto por ID)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  // 5. DELETE /product/1 (Eliminar producto por ID)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.remove(id);
  }
}
