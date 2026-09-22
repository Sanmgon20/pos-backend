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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator'; // 👈 Importamos tu decorador real

@ApiTags('products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products') // La ruta base será http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. POST /products (Crear producto) -> SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  // 2. GET /products (Listar todos los productos) -> PÚBLICO O USUARIO LOGUEADO
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // 3. GET /products/1 (Buscar producto por ID o término) -> PÚBLICO O USUARIO LOGUEADO
  @Get(':termino')
  async findOne(@Param('termino') termino: string): Promise<Product> {
    return await this.productsService.findOne(termino);
  }

  // 4. PATCH /products/1 (Actualizar producto por ID) -> SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  // 5. DELETE /products/1 (Eliminar producto por ID) -> SOLO ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.remove(id);
  }
}
