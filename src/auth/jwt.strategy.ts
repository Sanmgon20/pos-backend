import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  legajo: number;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'super_secreto_key_para_desarrollo',
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      legajo: payload.legajo,
      rol: payload.rol, // <--- Usamos 'rol' igual que en tu entidad
    };
  }
}
