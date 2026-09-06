/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: 'Commerce.db',
  entities: [User],
  synchronize: false,
  logging: true,
}),
UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
