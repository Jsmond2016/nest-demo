import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

@ApiTags('hobby')
@Controller('/hobby')
export class HobbyController {
  constructor(private readonly hobbyServise: HobbyService) {}

  @Get('/get-one')
  getOne(@Query() params: HobbyGetOneDto) {
    return this.hobbyServise.getOne(params);
  }

  @Get('/get-list')
  getList(@Query() params: HobbyGetListDto) {
    return this.hobbyServise.getList(params);
  }

  @Post('/create')
  create(@Body() body: HobbyCreateDto) {
    return this.hobbyServise.create(body);
  }

  @Put('/update')
  update(@Body() body: HobbyUpdateDto) {
    return this.hobbyServise.update(body);
  }

  @Delete('/delete')
  async delete(@Body() body: HobbyDeleteDto) {
    const { id } = body;
    const hobby = await this.hobbyServise.getOne(id);
    if (!hobby) {
      throw new HttpException('爱好不存在', 400);
    }
    return this.hobbyServise.delete(body);
  }

  @Delete('/batch-delete')
  batchDelete(@Body() body: HobbyBatchDto) {
    const { hobbyIds } = body;
    return this.hobbyServise.batchDelete(hobbyIds);
  }
}