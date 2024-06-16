import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { HobbyService } from './hobby.service';
import {
  HobbyGetOneDto,
  HobbyGetListDto,
  HobbyCreateDto,
  HobbyDeleteDto,
  HobbyBatchDto,
  HobbyUpdateDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('爱好模块')
@Controller('/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Get('/get-one')
  async getOne(@Query() params: HobbyGetOneDto, @Req() req: Request) {
    console.log('req: => params ',params);
    const data = await this.hobbyService.getOne(params);
    return data;
  }

  @Get('/get-list')
  getList(@Query() params: HobbyGetListDto) {
    return this.hobbyService.getList(params);
  }

  @Post('/create')
  create(@Body() body: HobbyCreateDto) {
    return this.hobbyService.create(body);
  }

  @Put('/update')
  update(@Body() body: HobbyUpdateDto) {
    return this.hobbyService.update(body);
  }

  @Delete('/delete')
  async delete(@Body() body: HobbyDeleteDto) {
    const { id } = body;
    const hobby = await this.hobbyService.getOne(id);
    if (!hobby) {
      throw new HttpException('爱好不存在', 400);
    }
    return this.hobbyService.delete(body);
  }

  @Delete('/batch-delete')
  batchDelete(@Body() body: HobbyBatchDto) {
    const { hobbyIds } = body;
    return this.hobbyService.batchDelete(hobbyIds);
  }
}
