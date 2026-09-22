import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 1. Validar que el legajo exista en la petición y sea un número válido
    const legajoParsed = Number(registerDto.legajo);

    if (!registerDto.legajo || isNaN(legajoParsed)) {
      throw new BadRequestException(
        'El legajo es obligatorio y debe ser un número válido.',
      );
    }

    // 2. Usar la variable validada para la búsqueda en TypeORM
    const existingUser = await this.userRepository.findOne({
      where: { legajo: legajoParsed },
    });

    if (existingUser) {
      throw new BadRequestException(
        'El legajo ya está registrado en el sistema.',
      );
    }

    // 3. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 4. Crear y guardar el usuario
    const newUser = this.userRepository.create({
      legajo: legajoParsed,
      name: registerDto.name,
      password: hashedPassword,
      rol: registerDto.rol || 'CASHIER',
      activo: 1,
    });

    await this.userRepository.save(newUser);

    return {
      id: newUser.id,
      legajo: newUser.legajo,
      name: newUser.name,
      rol: newUser.rol,
    };
  }

  async login(loginDto: LoginDto) {
    const legajo = Number(loginDto.legajo);
    const { password } = loginDto;

    console.log('--- INTENTO DE LOGIN ---');
    console.log(
      '1. Legajo recibido (parseado):',
      legajo,
      'Tipo:',
      typeof legajo,
    );
    console.log('2. Password recibida:', `"${password}"`);

    const user = await this.userRepository.findOne({ where: { legajo } });

    if (!user) {
      console.log('❌ RESULTADO: Usuario NO encontrado en la base de datos.');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('3. Usuario encontrado en DB:', {
      id: user.id,
      legajo: user.legajo,
      name: user.name,
    });
    console.log(
      '4. Hash guardado en DB:',
      user.password,
      'Largo del hash:',
      user.password?.length,
    );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('5. ¿Resultado de bcrypt.compare?:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ RESULTADO: Contraseña incorrecta.');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('✅ RESULTADO: Login exitoso!');

    const payload = { sub: user.id, legajo: user.legajo, rol: user.rol };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        legajo: user.legajo,
        name: user.name,
        rol: user.rol,
      },
    };
  }
}
