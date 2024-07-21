import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

@Injectable()
export class ConvertirObjectIdInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();

    // Convierte los IDs en ObjectId
    this.convertToObjectId(request.body);
    this.convertToObjectId(request.query);
    this.convertToObjectId(request.params);

    return next.handle();
  }

  private convertToObjectId(data: any) {
    if (data && typeof data === 'object') {
      for (const key in data) {
        if (key.endsWith('Id') && typeof data[key] === 'string') {
          if (Types.ObjectId.isValid(data[key])) {
            data[key] = new Types.ObjectId(data[key]);
          } else {
            throw new BadRequestException(`Invalid ObjectId format for field: ${key}`);
          }
        }
      }
    }
  }
}
