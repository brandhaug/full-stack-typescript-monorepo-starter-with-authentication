import './config/sentry'

import * as graphqlYoga from '@graphql-yoga/node'
import { schema } from './schema'
import Logger from './config/logger'
import { useSentry } from '@envelop/sentry'

void (async () => {
  const graphqlServer = graphqlYoga.createServer({
    schema,
    plugins: [useSentry()]
  })

  await graphqlServer.start()
})().catch((err: Error) => {
  Logger.error(err)
})
