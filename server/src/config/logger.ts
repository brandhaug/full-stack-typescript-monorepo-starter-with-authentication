import winston from 'winston'
const Sentry = require('winston-transport-sentry-node').default

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console(), new Sentry({ sentry: { dsn: process.env.SENTRY_DSN }, level: 'info' })]
})

export default logger
