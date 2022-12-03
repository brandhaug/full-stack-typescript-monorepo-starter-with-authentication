import { usePersistentState } from '../src/utils/stateHooks'
import { renderHook } from '@testing-library/react'

describe('usePersistentState', () => {
  test('should work with existing localStorage', () => {
    const key = 'localStorageKey'
    const existingValue = 'existingValue'
    const existingValueEncoded = JSON.stringify(existingValue)
    window.localStorage.setItem(key, existingValueEncoded)

    let renderCount = 0
    const { result } = renderHook(() => {
      renderCount++
      return usePersistentState<string>(key, 'defaultValue')
    })
    expect(renderCount).toBe(1)
    expect(result.current[0]).toBe(existingValue)
  })
})
