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
    const { legajo, name, password, rol } = registerDto;
    const existingUser = await this.userRepository.findOne({
      where: { legajo },
    });
    if (existingUser) {
      throw new BadRequestException(
        'El legajo ya está registrado en la base de datos',
      );
    }

    // 2. Hashear la contraseña con bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear y guardar el usuario
    const newUser = this.userRepository.create({
      legajo,
      name,
      password: hashedPassword,
      rol,
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
    const { legajo, password } = loginDto; // O si usás email/legajo según tu LoginDto

    const user = await this.userRepository.findOne({ where: { legajo } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

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
