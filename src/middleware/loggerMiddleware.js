import pino from 'pino';

// Create a logger instance Which will be used to log the information in the console
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      colorizeObjects: true,
    },
  },
  level: 'info',
});

export default logger;
