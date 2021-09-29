import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log('config.get ==>', config);
        return config.get('file')
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ConfigService ],
})
export class AlbumModule {}