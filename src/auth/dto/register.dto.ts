import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 1001, description: 'Número de legajo único' })
  @IsNumber()
  @IsNotEmpty()
  legajo!: number;

  @ApiProperty({ example: 'Santiago', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'USER', description: 'Rol del usuario' })
  @IsString()
  @IsNotEmpty()
  rol!: string;
}
