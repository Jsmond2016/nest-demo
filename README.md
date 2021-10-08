## 笔记

本文主要参考资料为：

- [Nodejs必学框架 | Nest企业级项目构建与开发实战](https://www.bilibili.com/video/BV1bQ4y1A77L)
- [Exemplary real world backend API built with NestJS + TypeORM / Prisma](https://github.com/lujakob/nestjs-realworld-example-app)，对应 [翻译](https://cnodejs.org/topic/60e669d4ba74606a00862e23)


## 项目计划

- [x] CRUD 基本操作
- [x] 接口参数校验
- [x] 数据库操作：（注：暂不处理各种外键和关联）
  - [x] ORM 操作数据库
  - [x] 事务处理
- [x] 过滤器
- [x] 路由守卫
  - [x] JWT 用户鉴权
  - [x] 接口级权限点验证
- [ ] 中间件
  - [x] 错误捕获，错误统一返回格式
  - [ ] 正常接口返回格式统一化
- [ ] 安全处理
- [x] 文件上传
  - [x] 单个文件上传
  - [x] 多文件上传
- [x] 文件下载
  - [x] 单文件下载
  - [x] 多文件下载
- [ ] Excel 内容解析处理
- [ ] 测试用例
- [x] Swagger 接口文档
- [x] Log 日志记录
- [ ] Redis 缓存
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
# 创建模块
nest g module user

# 创建控制器
nest g controller user

# 创建服务
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

> 内容详细参考：[Nestjs 中文网-数据库](https://docs.nestjs.cn/8/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93)

- 数据库定义

新建 `/ormconfig.json` 文件

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "nest_test",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

主要关注 数据库的 **账号、密码、数据库名、实体**

- 表定义

新建 `user.entity.ts` 文件，内容为

```typescript
@Entity('user')
export class User {}
```

- 字段定义 & 字段关联关系

```typescript
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hobby } from '../hobby/hobby.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', charset: 'utf8', comment: '用户名' })
  name: string;

  @Column({ default: '', length: 11, charset: 'utf8', comment: '用户电话' })
  phone: string;

  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;

  // 字段关联关系 
  @OneToMany(() => Hobby, (hobby) => hobby.user)
  hobby: Hobby[];
}
```



### CRUD操作

> [TypeORM 中文文档](https://typeorm.biunav.com/zh/)

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
  "code": 400,
  "message": "id 不能为空",
}
```

- 其他异常

```json
{
   "code": 400,
  "message": "error ....",
}
```

### 配置 `class-validator`

> 注意，所有 dto 参数校验都需要使用 class 的形式，否则 无法校验

- 定义接口，不同的接口入参要求不同
- 定义 参数 `dto`

```typescript
// user.dto.ts
import { IsNotEmpty, Length, ArrayNotEmpty, IsArray } from 'class-validator';
import { Hobby } from 'src/modules/hobby/hobby.entity';
export class CreateUserDto {
  @IsNotEmpty({ message: 'name不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: 'phone不能为空' })
  @Length(6, 20, { message: 'phone长度不合法' })
  readonly phone: string;

  @IsArray()
  readonly hobby: Hobby[];
}

export class CreateUserResDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly id: string;

  @IsNotEmpty({ message: 'name不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: 'phone不能为空' })
  @Length(6, 20, { message: 'phone长度不合法' })
  readonly phone: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly id: number;
}

export class GetOneUserDto {
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number;
}

export class GetUserListDto {
  @IsNotEmpty({ message: 'pageIndex不能为空' })
  pageIndex: number;

  @IsNotEmpty({ message: 'pageSize不能为空' })
  pageSize: number;
}

export class DeleteUserDto {
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number;
}
export class BatchDeleteUserDto {

  @ArrayNotEmpty({ message: 'id不能为空' })
  readonly userIds: number[];
}
```



**接口例子**

- controller 层

```typescript
// user.controller.ts

@Controller('/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('/create')
  create(@Body() user: CreateUserDto) {
    return this.userService.save(user);
  }

  @Put('/update')
  async update(@Body() user: UpdateUserDto) {
    const user1 = await this.userService.getOne(user.id);
    if (!user1) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = { ...user1, ...user };
    return this.userService.save(newUser);
  }

  @Get('/get-by-id')
  async get(@Query() params: GetOneUserDto) {
    const { id } = params;
    const user = await this.userService.getOne(id);
    return user || {};
  }
}
```

- service 层

```typescript
// user.service.ts

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

   // 使用事务
  async save(user: CreateUserDto): Promise<any> {
    const { hobby, ...userInfo } = user;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id } = await queryRunner.manager.save(User, userInfo);
      const hobbies = hobby.map((h) => ({ ...h, userId: id }));
      await queryRunner.manager.save(Hobby, hobbies);
      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
    // return this.usersRepository.save(user);
    // return Promise.resolve();
  }

  getList(params: GetUserListDto): Promise<User[]> {
    console.log('params: ', params);
    return this.usersRepository.find({ relations: ['hobby'] });
  }

  getOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['hobby'] });
  }

  async delete(id: number | number[]): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

```


- 关于事务：[nestjs中typeorm事务操作的三种方式](https://blog.csdn.net/kuangshp128/article/details/98179667)

对 一个数据库多个表进行操作，当其中一个表操作失败的时候 ，能够全部回滚。

```typescript
async createMany(users: User[]) {
  const queryRunner = this.connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.save(users[0]);
    await queryRunner.manager.save(users[1]);

    await queryRunner.commitTransaction();
  } catch (err) {
    //如果遇到错误，可以回滚事务
    await queryRunner.rollbackTransaction();
  } finally {
    //你需要手动实例化并部署一个queryRunner
    await queryRunner.release();
  }
}

```


### 配置 swagger

参考：[swagger](https://docs.nestjs.cn/8/recipes?id=swagger)

### 其他：

> - 视频：[【Nestjs实战】Nodejs必学框架 | Nest企业级项目构建与开发实战](https://www.bilibili.com/video/BV1bQ4y1A77L?p=1)
>
> - 仓库：https://github.com/HeyiMaster/nest-starter

- 自定义 logger 中间件
- 异常过滤
- 参数类型转换管道
- 角色守卫
- 邮件服务
- 配置集中管理
- 服务监控
- jwt 鉴权
- 定时任务
- 任务队列
- 文件上传和下载

## 参考资料

**相关资料：**

- [Nest官方文档](https://github.com/nestjs/nest) 
- [nestjs中文文档](https://docs.nestjs.cn/8/firststeps)
- [typeorm 中文文档](https://typeorm.biunav.com/zh/#%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%AD%E6%9B%B4%E6%96%B0)
- [doc-typeorm](https://docs.nestjs.cn/8/firststeps)
- [写给前端的 Nest.js 教程——10分钟上手后端接口开发](https://juejin.cn/post/6885751452015263758)
- [做了一个Nest.js上手项目，很丑，但适合练手和收藏](https://juejin.cn/post/6999079863487299597)

**视频**

- [基于TypeScript的NodeJs框架：NestJs开发博客API (node.js+nest.js)](https://www.bilibili.com/video/BV1U441117xK)

**swagger**

- [@nestjs/swagger](https://github.com/nestjs/swagger)
- [nestjs 使用swagger 搭建接口文档](https://blog.csdn.net/gwdgwd123/article/details/105412274)
- [nest集成swagger](https://blog.csdn.net/weixin_44828005/article/details/116136244)

**项目参考**

- [基于Vue.js,Nest.js的前后端分离Blog|Based on Vue.js, Nest.js Separation | Blog](https://github.com/Dwsy/Blog)
- [HeyiMaster/nest-starter](https://github.com/HeyiMaster/nest-starter)
- [nest starter project](https://github.com/HeyiMaster/nest-starter)
- [Midway-GraphQL-Starter midway](https://github.com/linbudu599/Midway-GraphQL-Starter midway)  和 nest 是有很多相似之处的，可以看看这个项目模板
- [阿童木聊天室](https://github.com/genaller/genal-chat) 阿童木聊天室 nestjs+vue全栈聊天室 前后端分离 typescript一把梭
- [Staart API](https://github.com/staart/api) a Node.js backend starter for SaaS startups written in TypeScript
