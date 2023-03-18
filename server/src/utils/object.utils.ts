export const jsonStringify = (obj: object, indent = 2): string => {
  const mutableCache: unknown[] = []
  const retVal = JSON.stringify(
    obj,
    (_, value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        if (mutableCache.includes(value)) return undefined
        mutableCache.push(value)
      }
      return value
    },
    indent
  )
  return retVal
}
