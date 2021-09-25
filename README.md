## 笔记

> 参考教程：[Exemplary real world backend API built with NestJS + TypeORM / Prisma](https://github.com/lujakob/nestjs-realworld-example-app)

**相关资料：**

- [Nest](https://github.com/nestjs/nest) 
- [nestjs中文文档](https://docs.nestjs.cn/8/firststeps)
- [typeorm 中文文档](https://typeorm.biunav.com/zh/#%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%AD%E6%9B%B4%E6%96%B0)
- [doc-nestjs](https://docs.nestjs.com/first-steps)
- [doc-typeorm](https://docs.nestjs.cn/8/firststeps)
- [写给前端的 Nest.js 教程——10分钟上手后端接口开发](https://juejin.cn/post/6885751452015263758)

**swagger**
- [@nestjs/swagger](https://github.com/nestjs/swagger)
- [nestjs 使用swagger 搭建接口文档](https://blog.csdn.net/gwdgwd123/article/details/105412274)
- [nest集成swagger](https://blog.csdn.net/weixin_44828005/article/details/116136244)

## 项目计划

- [x] CRUD 基本操作
- [x] 接口参数校验
- [ ] ORM 操作数据库，事务处理
- [ ] JWT 用户鉴权
- [ ] 中间件
  - [ ] 错误捕获
  - [ ] 接口返回格式统一化
  - [ ] 登录验证鉴权
  - [ ] 接口级权限点验证
- [ ] 安全处理
- [ ] Excel 导入导出
- [ ] 单个、多个 文件上传
- [ ] 测试用例
- [x] Swagger 接口文档
- [ ] Log 日志记录
- [ ] Docker 部署，区分 dev，test，prod 环境

## 项目搭建过程

### 了解 Nest

```bash
nest -h
```

可以看到很多 alias 命令

```bash
# module
nest g mo

# controller
nest g co

# service
nest g s
```

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

- 数据库定义
- 表定义 & 关联关系
- 字段定义

### CRUD操作

> [typeORM 中文文档](https://typeorm.biunav.com/zh/)

**接口入参约定**

- 查询

```typescript
// 单个查询
GET http://www.nest.com/api/user/get-one?id=123&token=asdf

// 批量查询
GET http://www.nest.com/api/user/get-list?token=asdf
```

- 新增

```typescript
// 单个新增
POST http://www.nest.com/api/user/create?token=asdf

{
    "name": "Nick",
    "password": "123456"
}

// 批量新增
POST http://www.nest.com/api/user/create?token=asdf

{
    "list": [
        {
            "name": "Nick",
            "password": "123456"
        },
        {
            "name": "Nick2",
            "password": "1234567"
        },
    ]
}
```

- 删除

```typescript
// 单个删除
DELETE http://www.nest.com/api/user/delete?token=asdf

{
    "id": 1234
}

// 批量删除
DELETE http://www.nest.com/api/user/batch-delete?token=asdf

{
    "list": [1234, 5678]
}
```

- 修改

```typescript
// 单个修改
PUT http://www.nest.com/api/user/delete?token=asdf

{
    "id": 1234,
    "name": "Nick",
    "password": "123456"
}

// 批量修改
PUT http://www.nest.com/api/user/batch-delete?token=asdf

{
    "list": [
        {
            "id": 1234,
            "name": "Nick",
            "password": "123456"
        },
        {
            "id": 4567,
            "name": "Nick",
            "password": "123456"
        }
    ]
}
```

**接口返回约定**

- 成功

```json
{
    "code": 200,
    "message": "操作成功",
    "data": {
        "id": 12345456,
        "name": "Nick"
    }
}
```

- 失败

```json
{
    "code": 400,
    "message": "用户不存在",
}
```

- 入参异常

```json
{
  "statusCode": 400,
  "message": [
    "id 不能为空"
  ],
  "error": "Bad Request"
}
```

- 其他异常

```json
{}
```

**接口例子**


- 增
- 删
- 查
- 改
- 连表
- 事务

### 配置 `class-validator`

- 定义接口
- 定义 参数 `dto`
- 

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

