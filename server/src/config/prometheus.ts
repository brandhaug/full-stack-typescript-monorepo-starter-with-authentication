// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const client = require('prom-client')

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
client.collectDefaultMetrics()
