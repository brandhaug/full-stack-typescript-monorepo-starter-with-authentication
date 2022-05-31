import React from 'react'
import { SetStateFn } from '../types/custom'

export const usePersistentState = <T,>(key: string, defaultValue: T): [T, SetStateFn<T>, () => void] => {
  const [state, setState] = React.useState(() => {
    try {
      const currentValue = window.localStorage.getItem(key)

      if (!currentValue) return defaultValue
      if (currentValue === 'undefined') return undefined

      return JSON.parse(currentValue)
    } catch {
      return defaultValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  const reset = () => {
    window.localStorage.removeItem(key)
  }

  return [state, setState, reset]
}

export const useDependencyState = <T,>(initValue: T | (() => T), dependencies: any[]): [T, SetStateFn<T>] => {
  const [value, setValue] = React.useState<T>(initValue)
  const firstRun = React.useRef(true)

  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setValue(initValue)
  }, dependencies)

  return [value, setValue]
}
