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

@ApiTags('products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products') // La ruta base será http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. POST /Products (Crear producto)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // 2. GET /products (Listar todos los productos)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // 3. GET /products/1 (Buscar producto por ID)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // 4. PATCH /products/1 (Actualizar producto por ID)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // 5. DELETE /product/1 (Eliminar producto por ID)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
