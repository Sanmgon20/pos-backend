import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  serverTime: Date;
  success: boolean;
  responseMessage: {
    messageCode: string;
    message: string;
  };
  data: T | null;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        serverTime: new Date(),
        success: true,
        responseMessage: {
          messageCode: '0000',
          message: 'OK',
        },
        data: data ?? null,
      })),
    );
  }
}
