import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: 'h305859@163.com',
      from: '305859189@qq.com',
      subject: 'email test',
      // html: '<b>Welcome Frost!</b>',
      template: './welcome',
      context: {
        // Data to be sent to template engine.
        code: 'cf1a3f828287',
        username: 'walker lee',
      },
    });
  }
}