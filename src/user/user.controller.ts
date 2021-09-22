import { UserService } from './user.service';
import { Body, Controller, Post, Get, Param, Query, HttpException, HttpStatus  } from '@nestjs/common';
import { CreateUserDto, GetOneUserDto, GetUserListDto, DeleteUserDto } from './dto'


@Controller('/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post("/create")
  create(@Body() user: CreateUserDto) {
    return this.userService.save(user);
  }

  @Post("/update")
  async update(@Body() user: CreateUserDto) {
    const user1 = await this.userService.getOne(user.id)
    if (!user1) {
      throw new HttpException("用户不存在", HttpStatus.BAD_REQUEST)
    }
    const newUser = { ...user1, ...user }
    return this.userService.save(newUser);
  }

  @Get("/get-by-id")
  get(@Query() params: GetOneUserDto) {
    const { id } = params;
    return this.userService.getOne(id);
  }

  @Get("/get-list")
  getList(@Query() params: GetUserListDto)  {
    return this.userService.getList(params);
  }

  @Post("/delete")
  async delete(@Body() user: DeleteUserDto) {
    const { id } = user;
    const tempUser = await this.userService.getOne(id)
    if (!tempUser) {
      throw new HttpException("用户不存在", HttpStatus.BAD_REQUEST)
    }
    return this.userService.delete(id);
  }
}
