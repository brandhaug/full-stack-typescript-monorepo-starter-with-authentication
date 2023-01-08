export const jsonStringify = (obj: object, indent = 2): string => {
  const cache: unknown[] = []
  const retVal = JSON.stringify(
    obj,
    (_, value) =>
      typeof value === 'object' && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  )
  return retVal
}
