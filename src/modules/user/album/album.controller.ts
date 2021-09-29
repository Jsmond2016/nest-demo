import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // https://docs.nestjs.cn/8/techniques?id=%e6%96%87%e4%bb%b6%e4%b8%8a%e4%bc%a0
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  upload(@UploadedFiles() files) {
    this.albumService.upload(files);
    return true;
  }

  @Get('export')
  async downloadAll(@Res() res: Response) {
    const { filename, tarStream } = await this.albumService.downloadAll();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}`,
    );
    tarStream.pipe(res);
  }
}