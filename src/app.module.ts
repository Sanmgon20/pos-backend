/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: 'Commerce.db',
  entities: [User,Product],
  synchronize: true,
  logging: true,
}),
UsersModule,
ProductsModule,
AuthModule,
ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
