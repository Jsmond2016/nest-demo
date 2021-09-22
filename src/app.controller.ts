import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/test")
  getHello(@Query() query: any): string {
    console.log('query: ', query);
    return this.appService.getHello();
  }
}
