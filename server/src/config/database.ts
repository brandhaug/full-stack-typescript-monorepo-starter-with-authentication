import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

export const prismaClient = new PrismaClient({
  log: [
    {
      level: 'info',
      emit: 'event'
    },
    {
      level: 'query',
      emit: 'event'
    },
    {
      level: 'warn',
      emit: 'event'
    },
    {
      level: 'error',
      emit: 'event'
    }
  ]
})

prismaClient.$on('query', (e) => {
  logger.debug(e.query)
})

prismaClient.$on('info', (e) => {
  logger.info(e.message)
})

prismaClient.$on('warn', (e) => {
  logger.warn(e.message)
})

prismaClient.$on('error', (e) => {
  logger.error(e.message)
})
