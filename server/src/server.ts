import * as graphqlYoga from '@graphql-yoga/node'
import { schema } from './schema'
import Logger from './config/logger'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.join(__dirname, '/../.env') })

void (async () => {
  const graphqlServer = graphqlYoga.createServer({
    schema
  })

  await graphqlServer.start()
})().catch((err: Error) => {
  Logger.error(err)
})
