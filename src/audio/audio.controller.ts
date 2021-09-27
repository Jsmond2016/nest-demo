import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('/audio')
export class AudioController {
  constructor(
    @InjectQueue('audio')
    private readonly audioQueue: Queue,
  ) {}

  @Post('/test')
  async transcode() {
    await this.audioQueue.add(
      'transcode',
      {
        file: 'audio.mp3',
      },

      {
        delay: 1000,
      },
    );
  }
}
