import './config/sentry'
import './config/prometheus'

import express from 'express'
import * as graphqlYoga from 'graphql-yoga'
import { schema } from './schema'
import { useSentry } from '@envelop/sentry'
import { usePrometheus } from '@envelop/prometheus'
import { logger } from './config/logger'

const promBundle = require('express-prom-bundle')

const app = express()

// GraphQL
const yoga = graphqlYoga.createYoga({
  schema,
  plugins: [useSentry(), usePrometheus()]
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', yoga)

// Prometheus
app.use(promBundle({}))

app.listen(4000, () => {
  logger.info('Running server at http://localhost:4000')
})
