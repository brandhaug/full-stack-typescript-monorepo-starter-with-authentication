export const jsonStringify = (obj: object, indent = 2): string => {
  const cache: unknown[] = []
  const retVal = JSON.stringify(
    obj,
    (_, value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.includes(value)) return undefined
        cache.push(value)
      }
      return value
    },
    indent
  )
  return retVal
}
