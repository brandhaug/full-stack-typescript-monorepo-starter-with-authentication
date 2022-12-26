import winston from 'winston'
import LokiTransport from 'winston-loki'
const Sentry = require('winston-transport-sentry-node').default

export const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.simple(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console(),
    new Sentry({
      sentry: { dsn: process.env.SENTRY_DSN },
      level: 'info'
    }),
    new LokiTransport({
      host: process.env.LOKI_HOST as string
    })
  ]
})
