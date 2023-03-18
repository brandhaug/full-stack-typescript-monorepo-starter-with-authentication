import React from 'react'
import { type SetStateFn } from '../types/custom'

export const useDependencyState = <T,>(initValue: T | (() => T), dependencies: Array<string | number | boolean | null | undefined>): [T, SetStateFn<T>] => {
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
