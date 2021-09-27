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
import { emailConfig, statusMonitorConfig } from './config';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// import { RoleAuthGuard } from '.common/guards/role-auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({ emailConfig })],
    }),
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        // console.log('config:=======>>>>>>>>> ', config);
        // return config.get('emailConfig');
        return emailConfig;
      },
      // inject: [ConfigService],
    }),
    StatusMonitorModule.forRoot(statusMonitorConfig),
    ScheduleModule.forRoot(),
    UserModule,
    HobbyModule,
    EmailModule,
    AuthModule,
    TasksModule,
    AudioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
