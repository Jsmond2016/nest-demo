import * as path from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

const emailConfig = {
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
};

export default emailConfig