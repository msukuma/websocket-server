const {
  addColors,
  createLogger,
  format,
  transports, } = require('winston');
const { printf } = format;
const { isoTimeStamp } = require('./util');
const  logLevels =  {
  error: 0,
  warn: 1,
  timeout: 2,
  session: 3,
  message: 4,
  info: 5,
  verbose: 6,
  debug: 7,
};

module.exports = function Logger() {
  const logTransports = [
    new transports.File({ filename: './logs/all.log' }),
  ];

  const logFormat = printf(info => {
    let log = {
      timestamp: isoTimeStamp(),
      level: info.level,
      message: info.message,
    };

    return JSON.stringify(log);
  });

  const logger =  createLogger({
    format: logFormat,
    levels: logLevels,
    transports: logTransports,
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
  }

  return logger;
};
