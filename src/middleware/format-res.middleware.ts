import { Request, Response, NextFunction } from 'express';

/**
 * 全局中间件
 * 
 * 响应体格式化
  {
    code: 200,
    message: 'ok',
    data: {}
  }
 */
export function formatResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // res.end = function (q, s: any, n) {
  //   console.log('res-data: ', s.data);
  //   n();
  // };
  const { method, originalUrl, body } = req;
  const { statusCode } = res;
  const reqStr = `request: => ${method} ${originalUrl} ${
    body ? 'body:' + JSON.stringify(body) : null
  }`;
  const resStr = `response: => ${statusCode}`;
  console.info(reqStr);
  console.info(resStr);
  next();
}
