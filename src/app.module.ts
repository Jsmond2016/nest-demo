import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HobbyModule } from './modules/hobby/hobby.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EmailModule } from './modules/email/email.module';
import { MailerModule } from '@nest-modules/mailer';
import config from './config';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// import { RoleAuthGuard } from '.common/guards/role-auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { AudioModule } from './audio/audio.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get('emailConfig');
      },
      inject: [ConfigService],
    }),
    StatusMonitorModule.forRoot(config().statusMonitorConfig),
    // ScheduleModule.forRoot(),
    UserModule,
    HobbyModule,
    EmailModule,
    AuthModule,
    // TasksModule,
    AudioModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleAuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
