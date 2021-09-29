import file from './file.config';
import redisConfig from './redis.config';
import emailConfig from './email.config';
import statusMonitorConfig from './status-monitor.config';

export default () => ({ emailConfig, statusMonitorConfig, file, redisConfig });
