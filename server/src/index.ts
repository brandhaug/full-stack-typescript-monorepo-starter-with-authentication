import * as graphqlYoga from '@graphql-yoga/node'
import { schema } from './schema'
import Logger from './config/logger'

void (async () => {
  const graphqlServer = graphqlYoga.createServer({
    schema
  })

  await graphqlServer.start()
})().catch((err: Error) => {
  Logger.error(err)
})
