import { Hobby } from 'src/hobby/hobby.entity';
import { Module } from '@nestjs/common';
import { HobbyController } from './hobby.controller';
import { HobbyService } from './hobby.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hobby])],
  controllers: [HobbyController],
  providers: [HobbyService],
})
export class HobbyModule {}
