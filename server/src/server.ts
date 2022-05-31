require('dotenv').config({ path: __dirname + '/../.env' })
import * as graphqlYoga from '@graphql-yoga/node'
import { schema } from './schema'
import Logger from './config/logger'

;(async () => {
  const graphqlServer = graphqlYoga.createServer({
    schema
  })

  await graphqlServer.start()
})().catch(err => {
  Logger.error(err)
})
