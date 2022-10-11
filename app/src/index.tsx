import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import 'flag-icons/css/flag-icons.min.css'
import './index.css'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<App />)
