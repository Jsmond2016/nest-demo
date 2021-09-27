import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

/**
 * 定时任务的使用场景
 * 
 * 1-用户上传的视频，音频等大文件进行压缩处理
 * 2-定时清理磁盘的临时文件
 * 
 * 
 * 
 */

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Cron--每分钟的第-45-秒执行');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Interval--定时任务，每-10-秒循环执行');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Timeout--定时任务，5-秒后-秒执行一次');
  }
}
