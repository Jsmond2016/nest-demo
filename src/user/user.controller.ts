import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Query,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  CreateUserDto,
  GetOneUserDto,
  GetUserListDto,
  DeleteUserDto,
  UpdateUserDto,
  CreateUserResDto,
  BatchDeleteUserDto,
} from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户', description: '创建用户' })
  @ApiBody({ type: CreateUserDto, description: '所有参数必传' })
  @ApiResponse({
    status: 200,
    description: '用户创建成功',
    type: CreateUserResDto,
  })
  @Post('/create')
  create(@Body() user: CreateUserDto) {
    return this.userService.save(user);
  }

  @ApiOperation({ summary: '更新用户', description: '更新用户' })
  @ApiBody({ type: UpdateUserDto, description: '所有参数必传' })
  @ApiResponse({
    status: 200,
    description: '用户创建成功',
    type: UpdateUserDto,
  })
  @Put('/update')
  async update(@Body() user: UpdateUserDto) {
    const user1 = await this.userService.getOne(user.id);
    if (!user1) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = { ...user1, ...user };
    return this.userService.save(newUser);
  }

  @ApiOperation({ summary: '查询用户', description: '查询用户' })
  @ApiQuery({ type: GetOneUserDto, required: true })
  @ApiResponse({
    status: 200,
    description: '',
    type: CreateUserResDto,
  })
  @Get('/get-by-id')
  async get(@Query() params: GetOneUserDto) {
    const { id } = params;
    const user = await this.userService.getOne(id);
    return user || {};
  }

  @ApiOperation({ summary: '查询用户列表', description: '查询用户列表' })
  @ApiResponse({
    status: 200,
    description: '',
    type: CreateUserResDto,
    isArray: true,
  })
  @Get('/get-list')
  getList(@Query() params: GetUserListDto) {
    return this.userService.getList(params);
  }

  @ApiOperation({ summary: '删除用户', description: '删除用户' })
  @ApiBody({ type: DeleteUserDto, description: '所有参数必传' })
  @ApiResponse({
    status: 200,
    description: '',
    type: CreateUserResDto,
  })
  @Delete('/delete')
  async delete(@Body() user: DeleteUserDto) {
    const { id } = user;
    const tempUser = await this.userService.getOne(id);
    if (!tempUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: '批量删除用户', description: '批量删除用户' })
  @ApiBody({ type: BatchDeleteUserDto, description: '所有参数必传' })
  @ApiResponse({
    status: 200,
    description: '操作成功！',
  })
  @Delete('/batch-delete')
  async batchDelete(@Body() body: BatchDeleteUserDto) {
    const { userIds } = body;
    if (Array.isArray(userIds) && userIds.length > 0) {
      return this.userService.delete(userIds);
    } else {
      throw new HttpException('没有用户id', HttpStatus.BAD_REQUEST);
    }
  }
}
