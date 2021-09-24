import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const { method, originalUrl, body } = req;
    const { statusCode, } = res;
    const reqStr = `request: => ${method} ${originalUrl} ${body ? 'body:' + JSON.stringify(body) : null }`
    const resStr = `response: => ${statusCode}`
    console.info(reqStr)
    console.info(resStr)
    next();
  }
}