import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试  ??? 为什么会有权限验证？
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body: any) {
    console.log('body: ', body);
    return this.authService.login(body);
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
