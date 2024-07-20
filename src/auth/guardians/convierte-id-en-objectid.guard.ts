import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

@Injectable()
export class ConvierteIdEnObjectIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Convertir los IDs en ObjectId
    this.convertToObjectId(request.params);
    this.convertToObjectId(request.query);
    this.convertToObjectId(request.body);

    return true;
  }

  private convertToObjectId(data: any) {
    for (const key in data) {
      if (key.endsWith('Id') && Types.ObjectId.isValid(data[key])) {
        try {
          data[key] = new Types.ObjectId(data[key]);
        } catch (error) {
          throw new BadRequestException(`Invalid ObjectId format for field: ${key}`);
        }
      }
    }
  }
}
