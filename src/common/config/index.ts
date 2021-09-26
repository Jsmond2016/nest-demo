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

const statusMonitorConfig = {
  title: 'NestJS Status', // Default title
  path: '/status',
  socketPath: '/socket.io', // In case you use a custom path
  port: null, // Defaults to NestJS port
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  ignoreStartsWith: ['/admin'], // paths to ignore for responseTime stats
  healthChecks: [],
};

export { emailConfig, statusMonitorConfig };
