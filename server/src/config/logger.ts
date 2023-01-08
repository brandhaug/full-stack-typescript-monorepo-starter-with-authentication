import winston from 'winston'
import LokiTransport from 'winston-loki'

const Sentry = require('winston-transport-sentry-node').default

const transports =
  process.env.NODE_ENV === 'production'
    ? [
        new winston.transports.Console(),
        new Sentry({
          sentry: { dsn: process.env.SENTRY_DSN },
          level: 'info'
        }),
        new LokiTransport({
          host: process.env.LOKI_HOST as string
        })
      ]
    : [new winston.transports.Console()]

export const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL ?? 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json(),
    winston.format.colorize()
  ),
  transports
})
