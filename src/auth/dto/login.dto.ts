import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 1001,
    description: 'Número de legajo del usuario',
  })
  @IsNumber()
  @IsNotEmpty()
  legajo!: number;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  password!: string;
}
