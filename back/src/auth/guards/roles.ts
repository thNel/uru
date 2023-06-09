import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserGroup } from '@/typeorm/entities/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (!roles.includes(UserGroup.ADMIN)) {
      roles.push(UserGroup.ADMIN)
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return roles.includes(user.userGroup);
  }
}