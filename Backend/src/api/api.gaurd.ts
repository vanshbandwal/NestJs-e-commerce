import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuards implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['auth-token'];
    if (!token) {
      throw new UnauthorizedException('Please authenticate using a valid token');
    }

    try {
      const decoded = jwt.verify(token, 'SECRET_KEY') as { userId: string };
      request.user = { id: decoded.userId }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
  