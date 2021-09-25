import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request: Request = context.switchToHttp().getRequest();
    // const { token } = request.query;
    // // 其他逻辑
    // // jwt 验证 token 合法性
    // return !!token;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles: ', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // GET http://localhost:3000/user/get-by-id?id=2&user=user
    // 权限验证，一般是通过 token 去查 权限 codeList，每一个接口的权限点 interfaceCode 是固定的，然后对比 codeList.includes(interfaceCode)
    const user = request.query.user;
    return roles.includes(user);
  }
}
