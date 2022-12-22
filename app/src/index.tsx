import './config/sentry'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('root')

if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<App />)
}
