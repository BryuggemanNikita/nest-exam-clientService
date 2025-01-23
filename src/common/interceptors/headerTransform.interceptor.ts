import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResHeaderTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((res) => {
                const secret = res ? process.env['acces-token'] : '';
                const response = context.switchToHttp().getResponse<Response>();
                response.setHeader('acces-token', secret);
            }),
        );
    }
}
