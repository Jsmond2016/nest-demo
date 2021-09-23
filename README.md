## 笔记

> 参考教程：[Exemplary real world backend API built with NestJS + TypeORM / Prisma](https://github.com/lujakob/nestjs-realworld-example-app)

**相关资料：**

- [Nest](https://github.com/nestjs/nest) 
- [nestjs中文文档](https://docs.nestjs.cn/8/firststeps)
- [typeorm 中文文档](https://typeorm.biunav.com/zh/#%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%AD%E6%9B%B4%E6%96%B0)
- [doc-nestjs](https://docs.nestjs.com/first-steps)
- [doc-typeorm](https://docs.nestjs.cn/8/firststeps)

**swagger**
- [@nestjs/swagger](https://github.com/nestjs/swagger)
- [nestjs 使用swagger 搭建接口文档](https://blog.csdn.net/gwdgwd123/article/details/105412274)
- [nest集成swagger](https://blog.csdn.net/weixin_44828005/article/details/116136244)

**项目计划：**

- [x] CRUD 基本操作
- [x] 接口参数校验
- [ ] ORM 操作数据库
- [ ] JWT 用户鉴权，接口鉴权
- [ ] 中间件：错误捕获，接口返回格式统一化，登录验证鉴权，接口级权限点验证
- [ ] 安全处理
- [ ] Excel 导入导出
- [ ] 单个、多个 文件上传
- [ ] 测试用例
- [x] Swagger 接口文档
- [ ] Log 日志
- [ ] Docker 部署，区分 dev，test，prod 环境

## 项目搭建过程

### 项目初始化

- 全局安装 `nest`，初始化项目：

```bash
npm i -g @nestjs/cli

nest new nest-demo
```

- 核心组成部分：
  - module
  - controller
  - service
  - dto
  - entity
- 创建模块：

```bash
nest g module user

nest g controller user

nest g service user
```

创建完成后，在 `app.module.ts` 导入新建的 `user.module.ts` ，代码如下：

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 配置数据库

### CRUD操作

### 配置 `class-validator`

### 配置 swagger



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

