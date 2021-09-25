import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HobbyModule } from './hobby/hobby.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import * as path from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://305859189@qq.com:wphvqdmftyvzcabi@smtp.qq.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: path.join(__dirname, './template/email'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
    HobbyModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
