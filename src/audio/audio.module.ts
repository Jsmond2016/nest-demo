import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.processor';
import redisConfig from '../config/redis.config';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'audio',
      useFactory: () => ({ redis: redisConfig }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [AudioController],
  providers: [AudioProcessor],
})
export class AudioModule {}
