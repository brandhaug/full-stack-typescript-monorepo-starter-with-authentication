import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN as string,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
})
